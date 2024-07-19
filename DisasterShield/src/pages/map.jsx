import { MapContainer, TileLayer, useMap, Popup, Marker } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import { useEffect, useState } from 'react';
import {useGeolocated} from "react-geolocated"
  function Map() {
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    return (
        
           <>
            <MapContainer center={[11.5, 76]} zoom={15} scrollWheelZoom={true}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[11.5, 76]}>
    <Popup>
    <div className="bg-white p-10 z-50 rounded-md">
                <label htmlFor="" className="text-black text-lg font-semibold">Response for Calamity</label>
                <input
            type="text"
            placeholder="Response"
            class="mt-5 w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            name="name"
            id="name"
          />
          <button className="text-lg font-semibold bg-black py-1.5 px-4 rounded-md mt-5 text-white">Submit</button>
            </div>
    </Popup>
    
  </Marker>
</MapContainer>
  
</>
        
    )
  }
  export default Map;