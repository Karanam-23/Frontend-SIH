import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentView, setView] = useState('home'); // default view is home
  
  // Shared state for chat flow
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hello! I am your JalRakshak Conservation Assistant. How can I help you today?' }
  ]);

  // Shared state for assessments
  const [assessments, setAssessments] = useState([
    {
      id: 'A-14',
      site: 'Site A-14',
      payback: '4.5 years',
      cost: '₹ 2,12,500',
      date: '2026-08-19'
    }
  ]);

  const [selectedSite, setSelectedSite] = useState('A-14');

  // Original polygon definition (mock values centered on Safdarjung Enclave, New Delhi)
  const defaultPolygon = [
    [28.55625, 77.20005],
    [28.55635, 77.20008],
    [28.55632, 77.20025],
    [28.55622, 77.20022]
  ];

  const [polygonCoords, setPolygonCoords] = useState(defaultPolygon);
  const [polygonHistory, setPolygonHistory] = useState([]);

  // Assessment API workflow states
  const [activeAssessment, setActiveAssessment] = useState(null);
  const [assessmentError, setAssessmentError] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState('UNBAKED_CLAY');
  const [occupants, setOccupants] = useState(4);

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
    if (JSON.stringify(polygonCoords) === JSON.stringify(defaultPolygon)) return;
    setPolygonHistory((prev) => [...prev, polygonCoords]);
    setPolygonCoords(defaultPolygon);
  };

  const addChatMessage = (text, sender = 'user') => {
    setChatMessages((prev) => [
      ...prev,
      { id: Date.now(), sender, text }
    ]);
  };

  const addAssessment = (assessment) => {
    setAssessments((prev) => [
      ...prev,
      { id: Date.now().toString(), ...assessment }
    ]);
  };

  return (
    <AppContext.Provider value={{
      currentView,
      setView,
      chatMessages,
      addChatMessage,
      assessments,
      addAssessment,
      selectedSite,
      setSelectedSite,
      polygonCoords,
      polygonHistory,
      updatePolygon,
      undoLastEdit,
      resetPolygon,
      activeAssessment,
      setActiveAssessment,
      assessmentError,
      setAssessmentError,
      selectedMaterial,
      setSelectedMaterial,
      occupants,
      setOccupants
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
