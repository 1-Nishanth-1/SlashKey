import { useState } from "react";
import { jwtDecode } from "jwt-decode";

const PatientForm = () => {
  const [person, setPerson] = useState({
    patient_name: "",
    priority: false,
    gender: "",
    age: "",
    blood_type: "",
    contact_number: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerson((prevPerson) => ({
      ...prevPerson,
      [name]: value,
    }));
  };

  const handleChecked = (e) => {
    setPerson((prevPerson) => ({
      ...prevPerson,
      priority: e.target.checked,
    }));
  };

  const handleRadio = (e) => {
    setPerson((prevPerson) => ({
      ...prevPerson,
      gender: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
    console.log("Person Data:", person);

    fetch("http://127.0.0.1:8000/api/blooddonation/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...person, username: decoded.user_id }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error.message));
  };

  return (
    <div className="mt-5 ml-52 p-5">
      <h1 className="font-semibold text-3xl">ADD PATIENT INFO</h1>
      <form
        onSubmit={handleSubmit}
        className="rounded-md ring-1 mt-5 ring-slate-900/5 shadow-lg p-5 flex justify-start gap-y-3 flex-col"
      >
        <label htmlFor="patient_name" className="font-semibold text-lg">
          Name
        </label>
        <input
          value={person.patient_name}
          onChange={handleChange}
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          name="patient_name"
          id="patient_name"
        />
        <label htmlFor="age" className="font-semibold text-lg">
          Age
        </label>
        <input
          value={person.age}
          onChange={handleChange}
          type="number"
          min={1}
          className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          name="age"
          id="age"
        />
        <label htmlFor="blood_type" className="text-lg font-semibold">
          Group
        </label>
        <input
          value={person.blood_type}
          onChange={handleChange}
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          name="blood_type"
          id="blood_type"
        />
        <label htmlFor="contact_number" className="text-lg font-semibold">
          Contact
        </label>
        <input
          value={person.contact_number}
          onChange={handleChange}
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          name="contact_number"
          id="contact_number"
        />
        <div className="flex items-center gap-x-4">
          <label htmlFor="priority" className="text-lg font-semibold">
            Priority
          </label>
          <input
            type="checkbox"
            checked={person.priority}
            onChange={handleChecked}
            id="priority"
          />
        </div>
        <label className="text-lg font-semibold">Gender</label>
        <div className="flex items-center gap-x-4">
          <label htmlFor="male">Male</label>
          <input
            type="radio"
            onChange={handleRadio}
            value="M"
            name="gender"
            id="male"
            checked={person.gender === "M"}
          />
          <label htmlFor="female">Female</label>
          <input
            type="radio"
            onChange={handleRadio}
            value="F"
            name="gender"
            id="female"
            checked={person.gender === "F"}
          />
        </div>
        <button
          type="submit"
          className="text-lg font-semibold py-1.5 px-4 bg-black text-white rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PatientForm;
