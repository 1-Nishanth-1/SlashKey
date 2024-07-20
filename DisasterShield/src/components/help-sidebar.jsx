import { useState } from "react";
import BloodDonation from "../pages/donation";
import AddMissing from "./addmissing";
import PatientForm from "./patientform";
import Missing from "./missing";
const HelpSideBar = () => {
    const tabs = [<BloodDonation />,<Missing />,<AddMissing />, <PatientForm />];
    const [selectedOption, setOption] = useState(0);

    const handleOption = (index) => () => {
        setOption(index);
    };

    const sidebarLinks = ["PATIENTS", "MISSING PEOPLE", "REPORT MISSING", "BLOOD DONATION"];

    return (
        <>
            <div className="h-full shadow-lg ring-1 ring-slate-900/5 fixed left-0 top-0 z-10">
                <div className="bg-white pt-32 px-5">
                    {
                        sidebarLinks.map((link, index) => (
                            <h3
                                key={index}
                                onClick={handleOption(index)}
                                className={`${index === selectedOption ? "text-slate-700" : "text-black"} mt-5 text-lg font-semibold cursor-pointer`}
                            >
                                {link}
                            </h3>
                        ))
                    }
                </div>
            </div>
            {tabs[selectedOption]}
        </>
    );
};

export default HelpSideBar;
