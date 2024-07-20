import { useState, useEffect } from "react";
import DonationCard from "../components/donationcard";

const BloodDonation = () => {
  const [cardDetails, setCardDetails] = useState([]);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/blooddonation/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCardDetails(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleBloodGroupChange = (e) => {
    setSelectedBloodGroup(e.target.value);
  };

  const filterDonations = (bloodGroup) => {
    const compatibleGroups = {
      "A+": ["A+", "AB+"],
      "A-": ["A+", "A-", "AB+", "AB-"],
      "B+": ["B+", "AB+"],
      "B-": ["B+", "B-", "AB+", "AB-"],
      "AB+": ["AB+"],
      "AB-": ["AB+", "AB-"],
      "O+": ["A+", "B+", "O+", "AB+"],
      "O-": ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    };

    return cardDetails.filter((item) =>
      compatibleGroups[bloodGroup]?.includes(item.blood_type)
    );
  };

  const filteredDetails = selectedBloodGroup
    ? filterDonations(selectedBloodGroup)
    : cardDetails;

  return (
    <div className="mt-5 ml-52 p-5">
      <div className="mb-5">
        <label htmlFor="bloodGroup" className="text-lg font-semibold mr-3">
          Select Your Blood Group:
        </label>
        <select
          id="bloodGroup"
          value={selectedBloodGroup}
          onChange={handleBloodGroupChange}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
      </div>
      <div className="grid grid-cols-5 gap-3">
        {filteredDetails.map((item) => (
          <DonationCard
            key={item.id}
            name={item.patient_name}
            phone={item.contact_number}
            urgent={item.isvalid}
            group={item.blood_type}
          />
        ))}
      </div>
    </div>
  );
};

export default BloodDonation;
