import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

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
const locations = [
  { name: "Paris, France", coords: [48.8566, 2.3522] },
  { name: "Sydney, Australia", coords: [-33.8688, 151.2093] },
  { name: "New York, USA", coords: [40.7128, -74.0060] },
  { name: "Tokyo, Japan", coords: [35.6895, 139.6917] },
  { name: "Rio de Janeiro, Brazil", coords: [-22.9068, -43.1729] }
];

export const WorldMap = () => {
  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: "500px", width: "60%" }}>
      {/* OpenStreetMap Tile Layer */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      {/* Add Markers */}
      {locations.map((loc, index) => (
        <Marker key={index} position={loc.coords} icon={customIcon}>
          <Popup>{loc.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};