import { useState } from "react";
const PatientForm = () => {
    const [person, setPerson] = useState({
        patient_name: '',
        priority: '',
        gender: '',
        age: null,
        blood_type: '',
        contact_number: '',
    })
    const handleChange = (e) => {
        setPerson({...person, [e.target.name]:e.target.value});
    }
     
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(person);
        fetch("http://120.0.0.1:8000/api/blooddonation/",{
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(person)
        })
    }
    const handleChecked = (e) => {
        if(e.target.checked){
            setPerson({...person, priority: true});
        }else{
            setPerson({...person, priority: false});
        }
    }
    const handleRadio = (e) => {
        setPerson({...person, gender: e.target.id});
    }
    return(
        <div className="mt-5 ml-52 p-5">
            <h1 className="font-semibold text-3xl">ADD PATIENT INFO</h1>
            <div className="rounded-md ring-1 mt-5 ring-slate-900/5 shadow-lg p-5 flex justify-start gap-y-3 flex-col ">
            <label htmlFor="" className="font-semibold text-lg">Name</label>
            <input
                value={person.patient_name}
                onChange={handleChange}
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="patient_name"
                id="name"
              />
              <label htmlFor="" className="font-semibold text-lg">Age</label>
              <input
                value={person.age}
                onChange={handleChange}
                type="number"
                min={1}
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="age"
                id="name"
              />
              <label htmlFor="" className="text-lg font-semibold">Group</label>
              <input
                value={person.blood_type}
                onChange={handleChange}
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="blood_type"
                id="name"
              />
              <label htmlFor="" className="text-lg font-semibold">Contact</label>
              <input
                value={person.contact_number}
                onChange={handleChange}
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="contact_number"
                id="contact"
              />
              <div className="flex items-center gap-x-4">
              <label htmlFor="" className="text-lg font-semibold">Priority</label>
              <input type="checkbox" onClick={handleChecked} />
              </div>
              <label htmlFor="" className="text-lg font-semibold">Gender</label>
              <div className="flex items-center gap-x-4">
                <span>Male</span><input onClick={handleRadio} type="radio" id="M" name="gender" />
              <span>Female</span><input onClick={handleRadio} type="radio" id="F" name="gender" />
              </div>

              
                <button onClick={handleSubmit} className='text-lg font-semibold py-1.5 px-4 bg-black text-white rounded-md'>Submit</button>
            </div>

    
        </div>
    )
}
export default PatientForm;