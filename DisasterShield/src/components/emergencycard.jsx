const EmergencyCard = ({ image, title, name }) => {
    return (
        <div className="p-5 flex gap-x-3 rounded-md ring-1 ring-slate-900/5 shadow-lg">
            <img src={image} className="h-36 w-36" alt="" />
            <div>
                <h1 className="text-xl font-bold text-slate-700">Nearest {title}:</h1>
                <h1 className="text-xl font-bold text-black mt-5">{name}</h1>
            </div>
        </div>
    );
}

export default EmergencyCard;
