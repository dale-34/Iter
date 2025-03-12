import axios from 'axios';
import dotenv from "dotenv";

dotenv.config(); // Load Env Variables

const API_BASE_URL = process.env.AMADEUS_API_BASE_URL ;
const CLIENT_ID = process.env.AMADEUS_API_KEY; 
const CLIENT_SECRET = process.env.AMADEUS_API_SECRET;

// Function to get an OAuth2 token
export const getAccessToken = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/v1/security/oauth2/token`, 
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
      }), 
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error.response?.data || error.message);
    throw error;
  }
};

export const getFlightDestinations = async (req) => {
  try {
    const token = await getAccessToken();
    const response = await axios.get(`${API_BASE_URL}/v2/shopping/flight-offers`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { 
        originLocationCode: 'TPA',
        destinationLocationCode: 'HNL',
        departureDate: '2025-03-15',
        returnDate: '2025-03-28',
        adults: 1,
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching flight destinations:', error.response?.data || error.message);
    throw error;
  }
};

getFlightDestinations().then(console.log).catch(console.error);
