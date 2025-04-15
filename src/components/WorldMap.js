import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useAuth } from "../AuthContext";

// Fix Leaflet marker icon issue
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});


// Locations to pin on the map
// const locations = [
//   { name: "Paris, France", coords: [48.8566, 2.3522] },
//   { name: "Sydney, Australia", coords: [-33.8688, 151.2093] },
//   { name: "New York, USA", coords: [40.7128, -74.0060] },
//   { name: "Tokyo, Japan", coords: [35.6895, 139.6917] },
//   { name: "Rio de Janeiro, Brazil", coords: [-22.9068, -43.1729] }
// ];

export const WorldMap = () => {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);
  const { userId } = useAuth();
  const myuserId = userId.userId;

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/db/get-trips/${myuserId}`);
        console.log("Trips from backend:", response.data.userTrips);
        setUserTrips(response.data.userTrips);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    fetchTrips();
  }, [myuserId]);

  const handleTripClick = (tripId) => {
    // Example: Pass trip ID or name to itinerary page
    navigate('/ItineraryPage', { state: { tripId } });
  };

  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: "500px", width: "65%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      {/* Use coordinates from userTrips if they exist */}
      {userTrips.map((trip, index) => (
        <Marker
          key={index}
          position={[trip.latitude, trip.longitude]}
          icon={customIcon}
        >
          <Popup>
            {trip.trip_name}
            <br />
            <button onClick={() => handleTripClick(trip.id)}>Trip Plan</button>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};



// export const WorldMap = () => {
//   const navigate = useNavigate();

//   const handleTripClick = (e) => {
//     // Handle popup click event
//     navigate('/ItineraryPage');
//   }

//   return (
//     <MapContainer center={[20, 0]} zoom={2} style={{ height: "500px", width: "65%" }}>
//       {/* OpenStreetMap Tile Layer */}
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
//       {/* Add Markers */}
//       {locations.map((loc, index) => (
//         <Marker key={index} position={loc.coords} icon={customIcon}>
//           <Popup>
//             {`${loc.name}`}
//             <button onClick={handleTripClick}>Trip Plan</button>
//           </Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   );
// };

