import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const MapComponent = ({ selectedProfile }) => {
  const pinIcon = L.divIcon({
    className: "custom-pin",
    html: `<div style="font-size: 40px; text-align: center;">📍<br/><span style="font-size: 16px; font-weight: bold;">Location</span></div>`,
    iconSize: [40, 50],
    iconAnchor: [20, 50], 
  });

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <MapContainer
        center={[selectedProfile.lat, selectedProfile.lng]}
        zoom={13}
        style={{
          height: "500px",
          width: "80vw",
          maxWidth: "900px",
          borderRadius: "15px",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
          background: "white",
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[selectedProfile.lat, selectedProfile.lng]} icon={pinIcon}>
          <Popup>{selectedProfile.address}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
