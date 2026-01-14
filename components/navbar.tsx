import Star from "./svgs/star";


export default function Navbar(){
    return (
        <nav className=" flex px-8 justify-between items-center">
            <h2 className="text-2xl md:text-4xl text-[#FCFFFF] font-medium md:ml-40">Stroke</h2>
           <div className="flex justify-between gap-4 md:gap-8">
            <a className="flex gap-2 text-[#FCFFFF] text-base  items-center" href="https://github.com/abhix4/stroke">Sponsor</a>
            <a className="flex gap-2 text-[#FCFFFF] text-base items-center " href="https://github.com/abhix4/stroke">Give a star <Star/></a>
           </div>
        </nav>
    )
}