import { useState, useEffect } from "react";
import DonationCard from "../components/donationcard";

const BloodDonation = () => {
  const [cardDetails, setCardDetails] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/blooddonation/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCardDetails(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="grid grid-cols-5 ml-52 gap-3 mt-5">
      {cardDetails.map((item) => (
        <DonationCard
          key={item.id}
          name={item.patient_name}
          phone={item.contact_number}
          urgent={item.isvalid}
          group={item.blood_type}
        />
      ))}
    </div>
  );
};

export default BloodDonation;
