import { useEffect, useState } from "react";
import police from '../assets/police.jpg';
import { policeStationValidator, HospitalValidator } from "../utils/emergencyValidation";
import EmergencyCard from "../components/emergencycard";

const Emergency = () => {
    const [nearestPoliceStation, setNearestPoliceStation] = useState('');
    const [nearestHospital, setNearestHospital] = useState('');

    useEffect(() => {
        fetch("https://overpass-api.de/api/interpreter?data=[out:json];node[amenity=hospital](around:7000,11.5,75.8977);out;")
            .then(res => res.json())
            .then(res => {
                setNearestHospital(res.elements[0].tags.name);
            })
            .catch(err => console.error("Error fetching hospitals:", err));
        // Fetch nearest police station
        fetch("https://overpass-api.de/api/interpreter?data=[out:json];node[amenity=police](around:7000,8.5154,76.8977);out;")
            .then(res => res.json())
            .then(res => {
                setNearestPoliceStation(res.elements[0].tags.name);
            })
            .catch(err => console.error("Error fetching police stations:", err));

        // Fetch nearest hospital
        
    }, []); // Add dependency array to run only once on mount

    return (
        <>
            <h1 className="font-semibold text-4xl ml-3 mt-3">EMERGENCY CONTACT</h1>
            <EmergencyCard image={police} name={nearestPoliceStation} />
            <EmergencyCard image={police} name={nearestHospital} />
            {/* You might want to include hospital information as well */}
        </>
    );
};

export default Emergency;
