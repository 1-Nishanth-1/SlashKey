import DonationCard from "../components/donationcard";
const BloodDonation = () => {
    return (
        <div className="grid grid-cols-5 ml-52 gap-3 mt-5">
            <DonationCard name={'Nishant'} phone={'+91-7909162091'} urgent={true} group={'B+'}/>
            <DonationCard name={'Nishant'} phone={'+91-7909162091'} urgent={true} group={'B+'}/>
            <DonationCard name={'Nishant'} phone={'+91-7909162091'} urgent={true} group={'B+'}/>
            <DonationCard name={'Nishant'} phone={'+91-7909162091'} urgent={true} group={'B+'}/>
            <DonationCard name={'Nishant'} phone={'+91-7909162091'} urgent={true} group={'B+'}/>
            <DonationCard name={'Nishant'} phone={'+91-7909162091'} urgent={true} group={'B+'}/>

        </div>
    )
}
export default BloodDonation;