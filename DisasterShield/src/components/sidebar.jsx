import { NavLink } from "react-router-dom";
import hamburger from "../assets/hamburger.png";
import { useEffect, useState } from "react";
import close from "../assets/close.png";
import ResponsiveNavbar from "./responsive-nav";
function Navbar() {
    const [clicked, setClicked] = useState(false);
    const handleClose = () => {
        setClicked(false);
    }
    const handleOpen  = () => {
        setClicked(true);
    }
    return (
        <header>
            <ResponsiveNavbar state={clicked} setState={setClicked} />
            <nav className="flex w-full h-24 px-10 items-center justify-between bg-white shadow-md z-40">
            <ul className="flex items-center gap-x-7">
                <NavLink to={"/"}><h1 className="text-3xl font-bold">DisasterShield</h1></NavLink>
                <div className={"hidden items-center md:flex gap-x-7"}>
                <NavLink to={"/"} className={({isActive})=> isActive ? " text-black underline underline-offset-[35px] decoration-8 decoration-custom-light-green" : "text-black no-underline"}><li onClick={handleClose} className={"text-lg tracking-widest font-bold "}>MAP</li></NavLink>
                <NavLink to={"/emergency"} className={({isActive})=> isActive? "text-black underline underline-offset-[35px] decoration-8 decoration-custom-light-green" : "text-black no-underline"}><li onClick={handleClose} className={"text-lg tracking-widest font-bold"}>EMERGENCY</li></NavLink>
                <NavLink to={"/help"} className={({isActive})=> isActive ? "text-black underline underline-offset-[35px] decoration-8 decoration-custom-light-green" : "text-black no-underline"}><li onClick={handleClose} className={"text-lg tracking-widest font-bold"}>HELP & SERVICES</li></NavLink></div>
                
            </ul>
            <ul className="hidden md:flex items-center">
                <NavLink to={"/add-response"}><button><h2 className="text-3xl mr-4 font-semibold mx-auto my-auto border-[1px] border-black rounded-md py-2 px-4">+</h2></button></NavLink>
                <NavLink to={"/signin"}><button className="border-2 mr-4 border-black bg-white text-black rounded-2xl py-1.5 px-4 font-semibold">Sign In</button></NavLink>
                <NavLink to={"/register"}><button className=" bg-black text-white rounded-2xl py-1.5 px-4 font-semibold">Join Now</button></NavLink>
            </ul>
            <img src={hamburger} onClick={handleOpen} className={"h-5 w-8 md:hidden" + `${clicked ? " hidden":""}`} alt="" />
            <img src={close} onClick={handleClose} className={"h-3 w-3 md:hidden " + `${clicked ? "block z-20":"hidden"}` }alt="" />
            
            </nav>
        </header>
    )
}
export default Navbar;
