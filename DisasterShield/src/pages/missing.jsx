import missing from '../assets/question.png'
const Missing = () => {
    return (
        <div className="p-5">
            <div className='flex gap-x-2 items-center'>
            <h1 className="font-semibold text-2xl md:text-4xl ">REPORT MISSING PEOPLE</h1>
            <img src={missing} className='h-8 w-8' alt="" />
            <div className='flex'>
                <div></div>
                <div></div>
            </div>
            </div>
        </div>
    )
}
export default Missing;