const MissingCard = ({name,age,location,image}) => {
    return (
        <div className="p-5 rounded-md ring-1 flex gap-y-4 flex-col items-start ring-slate-900/5 shadow-lg">
            <img src={image} className="h-44 w-44 rounded-md" alt="" />
            <h2 className="font-semibold text-xl"><span className="text-slate-700">Name: </span>{name}</h2>
            <h2 className="font-semibold text-xl"><span className="text-slate-700">Age: </span>{age}</h2>
            <h2 className="font-semibold text-xl"><span className="text-slate-700">Location: </span>{location}</h2>
            <button className="py-1.5 w-full font-semibold rounded-md text-white text-lg bg-green-600">Found</button>

        </div>
    )
}
export default MissingCard;