import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState, useRef, useMemo, useCallback } from "react";

function Map() {
  const [draggable, setDraggable] = useState(false);
  const markerRef = useRef(null);
  const [position, setPosition] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const newLatLng = marker.getLatLng();
          setPosition({ latitude: newLatLng.lat, longitude: newLatLng.lng });
          console.log(newLatLng.lat, newLatLng.lng);
        }
      },
    }),
    []
  );

  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    position.latitude !== null &&
    position.longitude !== null && (
      <MapContainer
        center={[position.latitude, position.longitude]}
        zoom={10}
        scrollWheelZoom={false}
        style={{ height: "100vh", width: "100%" }} // Ensure map takes up full screen
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          draggable={draggable}
          eventHandlers={eventHandlers}
          position={[position.latitude, position.longitude]}
          ref={markerRef}
        >
          <Popup minWidth={90}>
            <span onClick={toggleDraggable}>
              {draggable
                ? "Marker is draggable"
                : "Click here to make marker draggable"}
            </span>
          </Popup>
        </Marker>
      </MapContainer>
    )
  );
}

export default Map;
