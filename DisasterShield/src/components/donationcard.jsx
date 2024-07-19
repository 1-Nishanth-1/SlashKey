import close from "../assets/close.png"

const DonationCard = ({name,group,phone,urgent}) => {
    return (
        <div className="rounded-md p-10 relative shadow-lg ring-1 ring-slate-900/5">
            <img src={close} alt="" className="h-3 w-3 absolute top-2 right-2" />
            <h3 className="font-semibold text-lg"><span className="text-slate-700">Name: </span>{name}</h3>
            <h3 className="font-semibold text-lg"><span className="text-slate-700">Group: </span>{group}</h3>
            <h3 className="font-semibold text-lg"><span className="text-slate-700">Phone: </span>{phone}</h3>
            <h3 className="font-semibold text-lg"><span className="text-slate-700">Priority: </span>{urgent ?  "Yes":"No"}</h3>
        
        </div>
    )
}
export default DonationCard;