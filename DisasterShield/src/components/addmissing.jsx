import { useState } from 'react';
import question from '../assets/question.png'
const AddMissing = () => {
    const [person, setPerson] = useState({
        name: '',
        age: null,
        gender: '',
        desc: '',
        
    })
    const handleSubmit = () => {
        console.log(person)
        fetch("http://127.0.0.1:8000/api/missingpeople/",{
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(person)
        });
    }
    const handleChange = (e) => {
        setPerson({...person, [e.target.name]:e.target.value});
    }
    const handleRadio = (e) => {
        setPerson({...person, gender: e.target.id});
    }
    return(
        <div className="mt-5 ml-52 p-5">
            <h1 className="font-semibold text-3xl">ADD MISSING PEOPLE</h1>
            <div className="rounded-md ring-1 mt-5 ring-slate-900/5 shadow-lg p-5 flex justify-start gap-y-3 flex-col ">
            <label htmlFor="" className="font-semibold text-lg">Name</label>
            <input
                value={person.name}
                onChange={handleChange}
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="name"
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
              <label htmlFor="" className="text-lg font-semibold">Description</label>
              <input
                value={person.desc}
                onChange={handleChange}
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="desc"
                id="name"
              />
              <label htmlFor="" className="text-lg font-semibold">Gender</label>
              <div className='flex gap-x-4 items-center'>
              <label htmlFor="" className="text-md font-semibold">Male</label>
                <input type="radio" name="gender" onClick={handleRadio} id="M" />
                <label htmlFor="" className="text-md font-semibold" onClick={handleRadio}>Female</label>
                <input type="radio" name="gender" id="F" />
              </div>
              <button
          type="submit"
          onClick={handleSubmit}
          className="text-lg font-semibold py-1.5 px-4 bg-black text-white rounded-md"
        >
          Submit
        </button>
              
            </div>

            
        </div>
    )
}   
export default AddMissing;