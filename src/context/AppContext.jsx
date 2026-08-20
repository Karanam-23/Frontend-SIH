import React, { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext();

// SRS §6.3.3 error_code → view mapping
const ERROR_CODE_VIEW_MAP = {
  LOW_CONFIDENCE_FALLBACK:      'lowConfidence',
  RATE_LIMITED:                 'serviceDegraded',
  UPSTREAM_SERVICE_UNAVAILABLE: 'serviceDegraded',
  UPSTREAM_TIMEOUT:             'serviceDegraded',
  INTERNAL_ERROR:               'serviceDegraded',
  INVALID_COORDINATES:          'serviceDegraded',
  INVALID_ROOF_MATERIAL:        'serviceDegraded',
};

// Default polygon (Safdarjung Enclave, New Delhi) — used as the reset baseline
const DEFAULT_POLYGON = [
  [28.55625, 77.20005],
  [28.55635, 77.20008],
  [28.55632, 77.20025],
  [28.55622, 77.20022],
];

export const AppProvider = ({ children }) => {
  // ── View routing ──────────────────────────────────────────────────────────
  const [currentView, setView] = useState('home');

  // ── Assessment workflow status ────────────────────────────────────────────
  // Values: idle | locationSelected | roofAnalysis | propertyDetails |
  //         calculating | success | error
  const [assessmentStatus, setAssessmentStatus] = useState('idle');

  // ── Location captured by browser geolocation or manual entry ─────────────
  const [selectedLocation, setSelectedLocation] = useState(null);
  // Shape: { latitude, longitude, address?, source: 'GPS' | 'MANUAL' }

  // ── Assessment session identifiers ────────────────────────────────────────
  const [assessmentId, setAssessmentId] = useState(null);
  const [sessionId, setSessionId]       = useState(null);

  // ── Assessment result / error ─────────────────────────────────────────────
  const [activeAssessment, setActiveAssessment]   = useState(null);
  const [assessmentError,  setAssessmentError]    = useState(null);

  // ── Polygon editing state ─────────────────────────────────────────────────
  const [polygonCoords, setPolygonCoords]   = useState(DEFAULT_POLYGON);
  const [polygonHistory, setPolygonHistory] = useState([]);

  const updatePolygon = (newCoords) => {
    setPolygonHistory((prev) => [...prev, polygonCoords]);
    setPolygonCoords(newCoords);
  };

  const undoLastEdit = () => {
    if (polygonHistory.length === 0) return;
    const previous = polygonHistory[polygonHistory.length - 1];
    setPolygonCoords(previous);
    setPolygonHistory((prev) => prev.slice(0, -1));
  };

  const resetPolygon = () => {
    if (JSON.stringify(polygonCoords) === JSON.stringify(DEFAULT_POLYGON)) return;
    setPolygonHistory((prev) => [...prev, polygonCoords]);
    setPolygonCoords(DEFAULT_POLYGON);
  };

  // focusManualInput: set by LocationPermissionDenied to signal Home to focus the address field
  const [focusManualInput, setFocusManualInput] = useState(false);

  // ── Material / occupants form state ───────────────────────────────────────
  const [selectedMaterial, setSelectedMaterial] = useState('UNBAKED_CLAY');
  const [occupants, setOccupants]               = useState(4);

  // ── Assessment history list ───────────────────────────────────────────────
  const [assessments, setAssessments] = useState([
    { id: 'A-14', site: 'Site A-14', payback: '4.5 years', cost: '₹ 2,12,500', date: '2026-08-19' },
  ]);
  const [selectedSite, setSelectedSite] = useState('A-14');

  const addAssessment = (assessment) => {
    setAssessments((prev) => [...prev, { id: Date.now().toString(), ...assessment }]);
  };

  // ── Chat state ────────────────────────────────────────────────────────────
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hello! I am your JalRakshak Conservation Assistant. How can I help you today?' },
  ]);
  // pendingChatMessage: set by ChatDefault chip/input before navigating to chatActive;
  // consumed and cleared once by ChatActive on mount.
  const [pendingChatMessage, setPendingChatMessage] = useState(null);

  const clearPendingChatMessage = useCallback(() => setPendingChatMessage(null), []);

  const setPendingChatMessageValue = useCallback((message) => {
    if (!message || !String(message).trim()) {
      setPendingChatMessage(null);
      return;
    }
    setPendingChatMessage(String(message).trim());
  }, []);

  const addChatMessage = (text, sender = 'user') => {
    setChatMessages((prev) => [...prev, { id: Date.now(), sender, text }]);
  };

  // ── startNewAssessment ────────────────────────────────────────────────────
  // Resets the entire assessment workflow back to its initial state.
  // Does NOT reset chat history (user may wish to review past context).
  const startNewAssessment = useCallback(() => {
    setAssessmentStatus('idle');
    setSelectedLocation(null);
    setAssessmentId(null);
    setSessionId(null);
    setActiveAssessment(null);
    setAssessmentError(null);
    setFocusManualInput(false);
    setPolygonCoords(DEFAULT_POLYGON);
    setPolygonHistory([]);
    setSelectedMaterial('UNBAKED_CLAY');
    setOccupants(4);
    clearPendingChatMessage();
    setView('home');
  }, [clearPendingChatMessage]);

  // ── handleAssessmentResponse ──────────────────────────────────────────────
  // Centralized handler for the assessLocation() API response.
  // Stores IDs + result, then drives view transition based on status/error_code.
  const handleAssessmentResponse = useCallback((response, setViewFn) => {
    const navigate = setViewFn || setView;

    if (response && response.status === 'success') {
      setAssessmentId(response.assessment_id);
      setSessionId(response.session_id);
      setActiveAssessment(response);
      setAssessmentError(null);
      setAssessmentStatus('success');
      navigate('assessmentResults');
      return;
    }

    // Handle explicit error_code fields (mock triggerMockError or real backend errors)
    const errCode = response?.error_code
      || response?.response?.data?.error_code
      || 'INTERNAL_ERROR';
    const errMsg  = response?.message
      || response?.response?.data?.message
      || 'An unexpected error occurred.';

    setAssessmentError({ code: errCode, message: errMsg });
    setAssessmentStatus('error');
    const targetView = ERROR_CODE_VIEW_MAP[errCode] || 'serviceDegraded';
    navigate(targetView);
  }, []);

  // ── handleAssessmentError ─────────────────────────────────────────────────
  // Called from catch() blocks; reads error.response?.data shape.
  const handleAssessmentError = useCallback((error, setViewFn) => {
    const navigate = setViewFn || setView;
    const errCode = error?.response?.data?.error_code || 'INTERNAL_ERROR';
    const errMsg  = error?.response?.data?.message    || 'An unexpected connection error occurred.';

    setAssessmentError({ code: errCode, message: errMsg });
    setAssessmentStatus('error');
    const targetView = ERROR_CODE_VIEW_MAP[errCode] || 'serviceDegraded';
    navigate(targetView);
  }, []);

  return (
    <AppContext.Provider value={{
      // View
      currentView,
      setView,

      // Assessment workflow
      assessmentStatus,
      setAssessmentStatus,

      // Location
      selectedLocation,
      setSelectedLocation,

      // Session IDs
      assessmentId,
      setAssessmentId,
      sessionId,
      setSessionId,

      // Assessment data
      activeAssessment,
      setActiveAssessment,
      assessmentError,
      setAssessmentError,

      // Handlers
      startNewAssessment,
      handleAssessmentResponse,
      handleAssessmentError,

      // Polygon
      polygonCoords,
      polygonHistory,
      updatePolygon,
      undoLastEdit,
      resetPolygon,

      // Form state
      selectedMaterial,
      setSelectedMaterial,
      occupants,
      setOccupants,

      // History
      assessments,
      addAssessment,
      selectedSite,
      setSelectedSite,

      // Manual input focus signal (LocationPermissionDenied → Home)
      focusManualInput,
      setFocusManualInput,

      // Chat
      chatMessages,
      setChatMessages,
      addChatMessage,
      pendingChatMessage,
      setPendingChatMessage: setPendingChatMessageValue,
      clearPendingChatMessage,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
