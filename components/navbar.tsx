import Star from "./svgs/star";


export default function Navbar(){
    return (
        <nav className=" flex justify-between ">
        <p className="flex gap-2 text-[#FCFFFF] text-base  ml-auto items-center">Give a star <Star/></p>
        </nav>
    )
}