import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import L from "leaflet";
import "leaflet-defaulticon-compatibility";
import useUserStore from "./store";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

// Component to update the map center dynamically
function SetMapCenter({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

export default function Map() {
  const From = useUserStore((state) => state.From);
  const active = useUserStore((state) => state.active);
  const [location, setLocation] = useState({
    latitude: 51.505,
    longitude: -0.09,
  });

  // Get initial location from user's current position
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);

  // Update location when `active` changes
  useEffect(() => {
    if (active && active.location) {
      setLocation({
        latitude: active.location.lat,
        longitude: active.location.lng,
      });
    }
  }, [active]);

  const center = [location.latitude, location.longitude];

  return (
    <MapContainer center={center} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <SetMapCenter center={center} />

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Marker for the user's current location */}
      <Marker position={center}>
        <Popup>
          <strong>You are here</strong>
        </Popup>
      </Marker>

      {/* Markers for locations in `From` array */}
      {From &&
        From.map(
          (doc) =>
            doc.location && (
              <Marker position={[doc.location.lat, doc.location.lng]} key={doc._id}>
                <Popup>
                  <h1>{doc.name}</h1>
                  <p>{doc.email}</p>
                </Popup>
              </Marker>
            )
        )}
        <Toaster />
    </MapContainer>
  );
}
