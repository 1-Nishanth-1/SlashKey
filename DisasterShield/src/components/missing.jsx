import { useEffect, useState } from "react";
import MissingCard from "./missingcard";
const Missing = () => {
    const [missingPeople, setMissingPeople] = useState([]);
    const fetchMissingPeople = () => {
        fetch('http://127.0.0.1:8000/api/missingpeople/').then((res)=>res.json()).then((res)=>{
            setMissingPeople(res);
        })
    }
    useEffect(()=>{
        fetchMissingPeople();
    },[])
    return (
        <div className="mt-5 ml-52 p-5 grid-cols-1 md:grid-cols-5">
            <h1 className="font-semibold text-3xl pb-5">MISSING PEOPLE</h1>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
                {missingPeople.map((missingPeople)=>{
                    return <MissingCard name={missingPeople.name} age={missingPeople.age} gender={missingPeople.gender} desc={missingPeople.desc}/>
                })}
            </div>

        </div>
    )
}
export default Missing;