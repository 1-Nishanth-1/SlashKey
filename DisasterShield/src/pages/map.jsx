import { MapContainer, TileLayer, Popup, Marker, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState, useRef, useMemo } from "react";
import { jwtDecode } from "jwt-decode";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";

function Map() {
  const [open, setOpen] = useState(false);
  const [selectedCalamity, setSelectedCalamity] = useState(null);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const [draggable, setDraggable] = useState(false);
  const markerRef = useRef(null);
  const [position, setPosition] = useState({ latitude: null, longitude: null });
  const [warning, setWarning] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [calamityData, setCalamityData] = useState([]);

  const fetchCalamity = () => {
    fetch("http://127.0.0.1:8000/api/report/")
      .then((res) => res.json())
      .then((res) => {
        setCalamityData(res);
      });
  };

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
    fetchCalamity();
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

    fetch("http://127.0.0.1:8000/api/report/", {
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
      .then((data) => {
        console.log("Success:", data);

        // Check if calamity with the same latitude and longitude exists
        const existingCalamity = calamityData.find(
          (calamity) =>
            calamity.latitude === position.latitude &&
            calamity.longitude === position.longitude
        );

        if (existingCalamity) {
          // Update severity in state
          setCalamityData(
            calamityData.map((calamity) =>
              calamity.latitude === position.latitude &&
              calamity.longitude === position.longitude
                ? {
                    ...calamity,
                    severity: Math.max(calamity.severity, data.severity),
                  } // Update severity logic as needed
                : calamity
            )
          );
        } else {
          // Add new calamity to state
          setCalamityData([...calamityData, data]);
        }
      })
      .catch((error) => console.error("Error submitting form:", error));

    console.log("Warning:", warning);
    console.log("Description:", description);
    console.log("Image:", image);
  };

  const handleCircleClick = (calamity) => {
    setSelectedCalamity(calamity);
    openDrawer();
  };

  return (
    position.latitude !== null &&
    position.longitude !== null && (
      <>
        <div
          className="map-container"
          style={{ height: "100vh", width: "100%" }}
        >
          <MapContainer
            center={[position.latitude, position.longitude]}
            zoom={10}
            scrollWheelZoom={false}
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
                  <form className="min-w-72" onSubmit={handleSubmit}>
                    <input
                      placeholder="Enter Warning"
                      value={warning}
                      type="text"
                      onChange={(e) => setWarning(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                    />
                    <input
                      type="text"
                      placeholder="Enter Description"
                      value={description}
                      className="w-full p-2 border mt-3 border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                      type="file"
                      className="block mt-3 w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                    <button
                      type="submit"
                      className="mt-3 bg-black text-white font-semibold rounded-3xl py-1.5 px-4"
                    >
                      Submit
                    </button>
                  </form>
                ) : (
                  <button onClick={toggleDraggable}>
                    Click here to add a warning
                  </button>
                )}
              </Popup>
            </Marker>
            {calamityData
              .filter(
                (calamity) =>
                  calamity.latitude !== undefined &&
                  calamity.longitude !== undefined
              )
              .map((calamity) => (
                <Circle
                  key={calamity.id}
                  center={[calamity.latitude, calamity.longitude]}
                  pathOptions={{
                    color: calamity.severity > 5 ? "red" : "yellow",
                  }}
                  radius={3000}
                  eventHandlers={{
                    click: () => handleCircleClick(calamity),
                  }}
                />
              ))}
          </MapContainer>
        </div>
        <div className="drawer-container">
          <Drawer open={open} onClose={closeDrawer} className="p-4">
            <div className="mb-6 flex items-center justify-between">
              <Typography variant="h5" color="blue-gray">
                Calamity Details
              </Typography>
              <IconButton
                variant="text"
                color="blue-gray"
                onClick={closeDrawer}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </IconButton>
            </div>
            {selectedCalamity && (
              <>
                <Typography color="gray" className="mb-8 pr-4 font-normal">
                  <strong>Warning:</strong> {selectedCalamity.warning}
                </Typography>
                <Typography color="gray" className="mb-8 pr-4 font-normal">
                  <strong>Description:</strong> {selectedCalamity.desc}
                </Typography>
                <Typography color="gray" className="mb-8 pr-4 font-normal">
                  <strong>Severity:</strong> {selectedCalamity.severity}
                </Typography>
                {selectedCalamity.image && (
                  <img
                    src={`http://127.0.0.1:8000${selectedCalamity.image}`}
                    alt="Calamity"
                    className="w-full h-auto"
                  />
                )}
              </>
            )}
          </Drawer>
        </div>
      </>
    )
  );
}

export default Map;
