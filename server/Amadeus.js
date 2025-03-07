import axios from 'axios';

const API_BASE_URL = 'https://test.api.amadeus.com';
const CLIENT_ID = 'GMw1Kl77F5J3SOJAjgP7BDoOL7mbPd7Y'; // API Key
const CLIENT_SECRET = 'JiCQt10a7Jvujc4v'; // API Secret

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

// Function to get flight destinations from Paris under 200 EUR
export const getFlightDestinations = async () => {
  try {
    const token = await getAccessToken();
    const response = await axios.get(`${API_BASE_URL}/v1/shopping/flight-destinations`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { origin: 'PAR', maxPrice: 200 }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching flight destinations:', error.response?.data || error.message);
    throw error;
  }
};

getFlightDestinations().then(console.log).catch(console.error);
