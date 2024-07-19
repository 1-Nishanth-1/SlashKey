import { MapContainer, TileLayer, useMap, Popup, Marker } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import { useEffect, useState } from 'react';
import {useGeolocated} from "react-geolocated"
  function Map() {
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const getLocation = () => {
        const { coords, isGeolocationAvailable, isGeolocationEnabled } =
            useGeolocated({
                positionOptions: {
                    enableHighAccuracy: false,
                },
                userDecisionTimeout: 5000,
            });
        if (isGeolocationAvailable && isGeolocationEnabled) {
            setLatitude(coords.latitude);
            setLongitude(coords.longitude);
            console.log(coords.latitude),
            console.log(coords.longitude)
        }
    };
    
    useEffect(()=>{
        getLocation();
    },[])
    return (
        
            <MapContainer center={[latitude, longitude]} zoom={20} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[latitude, longitude]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>
        
    )
  }
  export default Map;