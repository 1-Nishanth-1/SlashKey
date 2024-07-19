import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState, useRef, useMemo } from "react";
import { jwtDecode } from "jwt-decode";

function Map() {
  const [draggable, setDraggable] = useState(false);
  const markerRef = useRef(null);
  const [position, setPosition] = useState({ latitude: null, longitude: null });
  const [warning, setWarning] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

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

  const toggleDraggable = () => {
    setDraggable((d) => !d);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const accessToken = localStorage.getItem("AccessToken");

    if (!accessToken) {
      console.error("No access token found in localStorage.");
      return;
    }

    let decoded;
    try {
      decoded = jwtDecode(accessToken);
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return;
    }
    console.log("Decoded JWT:", decoded);

    fetch("http://192.168.126.77:8000/api/report/", {
      method: "POST",
      body: JSON.stringify({
        desc: description,
        image: image,
        latitude: position.latitude,
        longitude: position.longitude,
        username: decoded.user_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log("Success:", data))
      .catch((error) => console.error("Error submitting form:", error));

    console.log("Warning:", warning);
    console.log("Description:", description);
    console.log("Image:", image);
  };

  return (
    position.latitude !== null &&
    position.longitude !== null && (
      <MapContainer
        center={[position.latitude, position.longitude]}
        zoom={10}
        scrollWheelZoom={false}
        style={{ height: "100vh", width: "100%" }}
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
            {draggable ? (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Enter Warning"
                  value={warning}
                  onChange={(e) => setWarning(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <button type="submit">Submit</button>
              </form>
            ) : (
              <button onClick={toggleDraggable}>
                Click here to add a warning
              </button>
            )}
          </Popup>
        </Marker>
      </MapContainer>
    )
  );
}

export default Map;
