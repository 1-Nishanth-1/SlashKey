const EmergencyCard = ({image,name}) => {
    return (
        <div className="p-5 rounded-md ring-1 ring-slate-900/5 shadow-lg">
            <img src={image} className="h-36 w-36" alt="" />
            <h1 className="text-xl font-bold text-black">{name}</h1>
        </div>
    )
}
export default EmergencyCard;