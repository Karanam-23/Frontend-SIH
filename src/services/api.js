/**
 * JalRakshak AI Water Platform — API Service
 *
 * Mock mode:  VITE_USE_MOCK_API=true  (default in dev)
 * Real mode:  VITE_USE_MOCK_API=false + VITE_API_BASE_URL set to backend root
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const USE_MOCK = import.meta.env.VITE_USE_MOCK_API !== 'false';

// ---------------------------------------------------------------------------
// Internal axios-like helper (keeps the existing axios import for real mode)
// ---------------------------------------------------------------------------
import axios from 'axios';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// ---------------------------------------------------------------------------
// STEP 1 — Development-only mock error helper
// Throws the correct SRS §6.3.3 error shape for a given error_code string.
// Must NOT be connected to any real form field or user input.
// Usage (dev console or test): triggerMockError('RATE_LIMITED')
// ---------------------------------------------------------------------------
export const triggerMockError = async (errorCode) => {
  const errorMap = {
    INVALID_COORDINATES:          { status: 400, message: 'The supplied coordinates are out of bounds.' },
    INVALID_ROOF_MATERIAL:        { status: 400, message: 'The roof material is invalid or unsupported.' },
    LOW_CONFIDENCE_FALLBACK:      { status: 422, message: 'AI model confidence too low for automatic boundary detection.' },
    RATE_LIMITED:                 { status: 429, message: 'Too many requests. Please try again later.' },
    UPSTREAM_SERVICE_UNAVAILABLE: { status: 503, message: 'The satellite analysis service is temporarily down.' },
    UPSTREAM_TIMEOUT:             { status: 504, message: 'The gateway connection timed out.' },
    INTERNAL_ERROR:               { status: 500, message: 'An internal server error occurred.' },
  };
  const err = errorMap[errorCode] || errorMap.INTERNAL_ERROR;
  throw {
    response: {
      status: err.status,
      data: { error_code: errorCode, message: err.message },
    },
  };
};

// ---------------------------------------------------------------------------
// Mock response builder — SRS §6.3.1 schema
// Accepts the submitted payload so location/polygon data echo back correctly.
// ---------------------------------------------------------------------------
function buildMockAssessmentResponse(payload) {
  const lat = payload.latitude ?? 28.5562;
  const lng = payload.longitude ?? 77.2001;

  return {
    status: 'success',
    assessment_id: crypto.randomUUID(),
    session_id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),

    location: {
      latitude: lat,
      longitude: lng,
      address: payload.address || '14B, Safdarjung Enclave, New Delhi, 110029',
      source: payload.source || 'GPS',
    },

    rooftop: {
      area_sqm: 116.1, // ~1250 sq ft
      confidence_score: 0.91,
      source: 'satellite_cv',
      polygon: payload.override_polygon?.coordinates?.[0] ?? [
        [77.20005, 28.55625],
        [77.20008, 28.55635],
        [77.20025, 28.55632],
        [77.20022, 28.55622],
        [77.20005, 28.55625],
      ],
    },

    hydrology: {
      annual_precipitation_mm: 850,
      runoff_coefficient: 0.85,
      filter_efficiency: 0.9,
      annual_harvestable_yield_litres: 83935,
      monsoon_yield_litres: 62951,
      monthly_distribution: [
        { month: 'Jan', yield_litres: 420 },
        { month: 'Feb', yield_litres: 380 },
        { month: 'Mar', yield_litres: 510 },
        { month: 'Apr', yield_litres: 730 },
        { month: 'May', yield_litres: 1840 },
        { month: 'Jun', yield_litres: 9700 },
        { month: 'Jul', yield_litres: 24350 },
        { month: 'Aug', yield_litres: 22100 },
        { month: 'Sep', yield_litres: 11200 },
        { month: 'Oct', yield_litres: 7850 },
        { month: 'Nov', yield_litres: 2650 },
        { month: 'Dec', yield_litres: 1205 },
      ],
      hydrogeology: {
        aquifer_type: 'alluvial',
        recharge_potential: 'high',
        depth_to_water_table_m: 12.4,
      },
    },

    recommendations: {
      primary_strategy: {
        type: 'DUAL_RECHARGE_HYBRID',
        description:
          'Combining rooftop collection with surface runoff infiltration provides the optimal ROI for your terrain.',
      },
      storage_tank: {
        capacity_litres: 10000,
        material: 'RCC',
        dimensions: '3m × 2m × 1.7m',
        estimated_cost_inr: 120000,
      },
      recharge_structure: {
        type: 'recharge_pit',
        depth_m: 3.5,
        estimated_cost_inr: 35000,
      },
      first_flush_diverter: {
        capacity_litres: 25,
        pipe_diameter_mm: 110,
        estimated_cost_inr: 12500,
      },
    },

    financial_boq: {
      currency: 'INR',
      total_estimated_cost_range: {
        min: 195000,
        max: 230000,
        midpoint: 212500,
      },
      estimated_payback_years: 4.5,
      line_items: [
        { category: 'Filtration',  description: 'Filter Unit (Dual Stage)',        qty: '2 Nos',   unit_cost_inr: 22500, total_cost_inr: 45000  },
        { category: 'Collection',  description: 'First Flush Diverter (PVC)',      qty: '4 Nos',   unit_cost_inr: 3125,  total_cost_inr: 12500  },
        { category: 'Storage',     description: 'Storage Tank (10,000L RCC)',      qty: '1 Unit',  unit_cost_inr: 120000,total_cost_inr: 120000 },
        { category: 'Conveyance',  description: 'Piping & Fittings (HDPE)',        qty: '150 Rmt', unit_cost_inr: 233,   total_cost_inr: 35000  },
      ],
    },
  };
}

// ---------------------------------------------------------------------------
// assessLocation — main assessment API call
// ---------------------------------------------------------------------------
export const assessLocation = async (payload) => {
  if (USE_MOCK) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1200));
    return buildMockAssessmentResponse(payload);
  }

  // Real backend path
  try {
    const response = await api.post('/api/assess', payload);
    return response.data;
  } catch (error) {
    console.error('assessLocation API error:', error);
    throw error;
  }
};

// ---------------------------------------------------------------------------
// streamChatMessage — SSE-style streaming chat (Step 10)
//
// Signature:
//   streamChatMessage(assessmentId, sessionId, message, onToken, onComplete, onError)
//
// Mock mode: chunks a canned response into tokens via setTimeout
// Real mode: POST /api/chat → ReadableStream → parse SSE frames
// ---------------------------------------------------------------------------
const MOCK_CHAT_RESPONSE =
  'Based on your roof area of 116 sq.m and average annual rainfall of 850 mm, ' +
  'a 10,000L RCC tank ensures you capture 98% of peak monsoon flow — roughly 62,951 litres ' +
  'during the June–September season alone. ' +
  'The dual-recharge hybrid strategy also provides groundwater recharge, ' +
  'improving aquifer levels under your property over time. ' +
  'For optimal results, I recommend installing the first-flush diverter before the first monsoon.';

export const streamChatMessage = (
  assessmentId,
  sessionId,
  message,
  onToken,
  onComplete,
  onError
) => {
  if (USE_MOCK) {
    // Split into word-level tokens and stream them with delays
    const tokens = MOCK_CHAT_RESPONSE.split(' ');
    let i = 0;
    const tick = () => {
      if (i >= tokens.length) {
        onComplete();
        return;
      }
      // Send next token (add space back except on last token)
      onToken((i < tokens.length - 1 ? tokens[i] + ' ' : tokens[i]));
      i++;
      setTimeout(tick, 45);
    };
    setTimeout(tick, 300); // initial "thinking" pause
    return; // no cleanup needed for mock
  }

  // Real backend — POST then consume body as SSE ReadableStream
  const controller = new AbortController();

  fetch(`${API_BASE_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ assessment_id: assessmentId, session_id: sessionId, message }),
    signal: controller.signal,
  })
    .then((res) => {
      if (!res.ok) throw new Error(`Chat API returned ${res.status}`);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      const pump = () =>
        reader.read().then(({ done, value }) => {
          if (done) { onComplete(); return; }
          buffer += decoder.decode(value, { stream: true });

          // Parse SSE frames from buffer
          const lines = buffer.split('\n');
          buffer = lines.pop(); // keep incomplete last line

          let eventType = null;
          for (const line of lines) {
            if (line.startsWith('event:')) {
              eventType = line.slice(6).trim();
            } else if (line.startsWith('data:')) {
              const data = line.slice(5).trim();
              if (eventType === 'token') onToken(data);
              else if (eventType === 'complete') { onComplete(); return; }
              eventType = null;
            }
          }
          pump();
        });

      pump();
    })
    .catch((err) => {
      if (err.name !== 'AbortError') onError(err);
    });

  // Return abort function so callers can cancel
  return () => controller.abort();
};

// ---------------------------------------------------------------------------
// Legacy sendChatMessage kept for any remaining static call sites.
// Deprecated — use streamChatMessage instead.
// ---------------------------------------------------------------------------
export const sendChatMessage = async (messages) => {
  console.warn('sendChatMessage is deprecated; use streamChatMessage instead.');
  try {
    const response = await api.post('/api/chat', { messages });
    return response.data;
  } catch (error) {
    console.error('sendChatMessage error:', error);
    throw error;
  }
};

export default {
  assessLocation,
  streamChatMessage,
  sendChatMessage,
  triggerMockError,
};
