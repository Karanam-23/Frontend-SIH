import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const assessLocation = async (payload) => {
  const useMock = import.meta.env.VITE_USE_MOCK_API !== 'false';
  
  if (useMock) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Simulate specific SRS error codes mapped to occupant values for testing
    if (payload.occupants === 0) {
      throw {
        response: {
          status: 400,
          data: { error_code: 'INVALID_COORDINATES', message: 'The supplied coordinates are out of bounds.' }
        }
      };
    }
    if (payload.occupants === -1) {
      throw {
        response: {
          status: 400,
          data: { error_code: 'INVALID_ROOF_MATERIAL', message: 'The roof material is invalid or unsupported.' }
        }
      };
    }
    if (payload.occupants === -2) {
      throw {
        response: {
          status: 429,
          data: { error_code: 'RATE_LIMITED', message: 'Too many requests. Please try again later.' }
        }
      };
    }
    if (payload.occupants === -3) {
      throw {
        response: {
          status: 503,
          data: { error_code: 'UPSTREAM_SERVICE_UNAVAILABLE', message: 'The satellite analysis service is down.' }
        }
      };
    }
    if (payload.occupants === -4) {
      throw {
        response: {
          status: 504,
          data: { error_code: 'UPSTREAM_TIMEOUT', message: 'The gateway connection timed out.' }
        }
      };
    }
    if (payload.occupants === -5) {
      throw {
        response: {
          status: 500,
          data: { error_code: 'INTERNAL_ERROR', message: 'An internal server error occurred.' }
        }
      };
    }

    // Simulate LOW_CONFIDENCE_FALLBACK state mapped to mock longitude of 999
    if (payload.longitude === 999) {
      return {
        status: 'LOW_CONFIDENCE_FALLBACK',
        message: 'The AI model had low confidence in boundary detection. Manual override required.'
      };
    }

    // Normal successful response structure matching backend contract exactly
    return {
      status: 'SUCCESS',
      data: {
        harvestable_water: 8217,
        runoff_coefficient: 0.85,
        payback_period: '4.5 years',
        cost: '₹ 2,12,500',
        storage_capacity: 10000,
        storage_dimensions: '10,000L RCC Tank',
        recommendation: 'Dual-recharge hybrid system suggested. Combining rooftop collection with surface runoff infiltration provides the optimal ROI for your terrain.',
        roof_area: 120,
        rainfall: 850,
        cost_items: [
          { category: 'Filtration', description: 'Filter Unit (Dual Stage)', qty: '2 Nos', amount: 45000 },
          { category: 'Collection', description: 'First Flush Diverter (PVC)', qty: '4 Nos', amount: 12500 },
          { category: 'Storage', description: 'Storage Tank (10,000L RCC)', qty: '1 Unit', amount: 120000 },
          { category: 'Conveyance', description: 'Piping & Fittings (HDPE)', qty: '150 Rmt', amount: 35000 }
        ],
        total_cost: 212500
      }
    };
  }

  // Real backend request path
  try {
    const response = await api.post('/api/assess', payload);
    return response.data;
  } catch (error) {
    console.error('Error in assessLocation API call:', error);
    throw error;
  }
};

export const sendChatMessage = async (messages) => {
  try {
    const response = await api.post('/api/chat', { messages });
    return response.data;
  } catch (error) {
    console.error('Error in sendChatMessage API call:', error);
    throw error;
  }
};

export default {
  assessLocation,
  sendChatMessage,
};
