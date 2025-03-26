import axios from "axios";
import dotenv from "dotenv";

dotenv.config(); // Load Env Variables

const API_BASE_URL = process.env.AMADEUS_API_BASE_URL;
const CLIENT_ID = process.env.AMADEUS_API_KEY;
const CLIENT_SECRET = process.env.AMADEUS_API_SECRET;

// Function to get an OAuth2 token
export const getAccessToken = async () => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/v1/security/oauth2/token`,
            new URLSearchParams({
                grant_type: "client_credentials",
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );
        return response.data.access_token;
    } catch (error) {
        console.error(
            "Error fetching access token:",
            error.response?.data || error.message
        );
        throw error;
    }
};

export const getFlightDestinations = async (req) => {
  try {
    const start = "GNV";
    const end = "HNL";
    const startDate = "2025-04-02";
    const endDate = "2025-04-12";
    const token = await getAccessToken();
    const response = await axios.get(`${API_BASE_URL}/v2/shopping/flight-offers`, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        originLocationCode: start,
        destinationLocationCode: end,
        departureDate: startDate,
        returnDate: endDate,
        adults: 1,
      }
    });


    return response.data;
  } catch (error) {
    console.error('Error fetching flight destinations:', error.response?.data || error.message);
    throw error;
  }
};

// export const getFlightDestinations = async ({
//     start,
//     end,
//     iataStart,
//     iataEnd,
// }) => {
//     try {
//         const token = await getAccessToken();
//         console.log("Access Token:", JSON.stringify(token));
//         console.log("IATA Start:", JSON.stringify(iataStart));
//         console.log("IATA End:", JSON.stringify(iataEnd));
//         console.log("Start Date:", JSON.stringify(start));
//         console.log("End Date:", JSON.stringify(end));

//         const cleanIataStart = iataStart.trim();
//         const cleanIataEnd = iataEnd.trim();
//         const cleanStart = start.trim();
//         const cleanEnd = end.trim();

//         const response = await axios.get(
//             `${API_BASE_URL}/v2/shopping/flight-offers`,
//             {
//                 headers: { Authorization: `Bearer ${token}` },
//                 params: {
//                     originLocationCode: cleanIataStart,
//                     destinationLocationCode: cleanIataEnd,
//                     departureDate: cleanStart,
//                     returnDate: cleanEnd,
//                     adults: 1,
//                 },
//             }
//         );

//         const config = {
//           headers: { Authorization: `Bearer ${token}` },
//           params: {
//               originLocationCode: cleanIataStart,
//               destinationLocationCode: cleanIataEnd,
//               departureDate: cleanStart,
//               returnDate: cleanEnd,
//               adults: 1,
//           },
//       };
//         console.log("Axios Config:", JSON.stringify(config));

//         return response.data;
//     } catch (error) {
//         console.error(
//             "Error fetching flight destinations:",
//             error.response?.data || error.message
//         );
//         throw error;
//     }
// };

getFlightDestinations().then(console.log).catch(console.error);