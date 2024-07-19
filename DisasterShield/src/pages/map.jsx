import { MapContainer, TileLayer, useMap, Popup, Marker } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import { useEffect, useState } from 'react';
import {useGeolocated} from "react-geolocated"
  function Map() {
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    return (
        
            <MapContainer center={[11.5, 75]} zoom={20} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[11.5, 75]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>
        
    )
  }
  export default Map;