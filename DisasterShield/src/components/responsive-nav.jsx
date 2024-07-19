import { NavLink } from "react-router-dom";
function ResponsiveNavbar ({state,setState}) {
    return(
    <div className={`${state ? "": "translate-x-[100%]"}`+" transition-transform duration-700 block fixed top-0 right-0 z-10 w-72 px-10 h-full bg-white md:hidden"}>
        <ul className="mt-36">
            <NavLink to={"/menu"} className="no-underline text-slate-600"><li className="pb-5 font-semibold" onClick={()=>setState(false)} >MAP</li></NavLink>
            <NavLink to={"/"} className="no-underline text-slate-600"><li className="pb-5 font-semibold" onClick={()=>setState(false)}>EMERGENCY</li> </NavLink>
            <NavLink to={"/gift"} className={"no-underline text-slate-600"}><li className="pb-5 font-semibold" onClick={()=>setState(false)}>HELP & SERVICES</li></NavLink>
        </ul>
        <hr className="bg-slate-600" />
        <div className=" flex justify-center items-center mt-5">
        <button className="border-2 mr-4 border-black bg-white text-black rounded-2xl py-1.5 px-4 font-semibold">Sign In</button>
        <button className=" bg-black text-white rounded-2xl py-1.5 px-4 font-semibold">Join Now</button>
        
        </div>
    </div>)
}
export default ResponsiveNavbar;