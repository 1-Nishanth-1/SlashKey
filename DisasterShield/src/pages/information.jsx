import { useState } from "react";
import police from "../assets/police.jpg"
const Information = () => {
    const [nearestPoliceStation, setNearestPoliceStation] = useState('');
    
    //https://nominatim.openstreetmap.org/reverse.php?lat=11.3216&lon=75.9336&zoom=13&format=jsonv2
    <div className="grid-cols-1 md:grid-cols-2">
        <div className="p-5 rounded-md shadow-lg ring-1 ring-slate-900/5">
            <img src={police} alt="" />
            
        </div>
        <div></div>
    </div>
}
export default Information;