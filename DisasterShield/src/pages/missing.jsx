import missing from '../assets/question.png'
import MissingCard from '../components/missingcard';
const Missing = () => {
    return (
        <div className="p-5">
            <div className='flex gap-x-2 items-center'>
            <h1 className="font-semibold text-2xl md:text-4xl ">REPORT MISSING PEOPLE</h1>
            <img src={missing} className='h-8 w-8' alt="" />
            
            </div>
            <div className='flex p-5'>
                <div>
                    <MissingCard name={'Nishant'} age={19} location={'Trivandrum'} image={'https://th.bing.com/th/id/R.b42d077f7608ecfe94a08b5d4213eb66?rik=0hx9eqp4xZnIiQ&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2f0%2fb%2f5%2f175341.jpg&ehk=EG20ra9%2fkw8bRtQ5LCMLWYQ4lE4GJ7WoUAw3QT7CP3s%3d&risl=&pid=ImgRaw&r=0'} />
                </div>
                <div></div>
            </div>
        </div>
    )
}
export default Missing;