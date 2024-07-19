import { useState } from "react";
const PatientForm = () => {
    const [person, setPerson] = useState({
        name: '',
        age: null,
        group: '',
        image: null,
    })
    const handleChange = (e) => {
        setPerson({...person, [e.target.name]:e.target.value});
    }
    const handleImage = (e) => {
        setPerson({...person, image: e.target.files[0]});
    }
    return(
        <div className="mt-5 ml-52 p-5">
            <h1 className="font-semibold text-3xl">ADD PATIENT INFO</h1>
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
              <label htmlFor="" className="text-lg font-semibold">Group</label>
              <input
                value={person.group}
                onChange={handleChange}
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="group"
                id="name"
              />
              <input type="file" onChange={handleImage} name="image" class="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100
                "/>
                {person.image != null ? <img className='h-52 w-full' src={URL.createObjectURL(person.image)} alt="" /> : null}
                <button className='text-lg font-semibold py-1.5 px-4 bg-black text-white rounded-md'>Submit</button>
            </div>

            
        </div>
    )
}
export default PatientForm;