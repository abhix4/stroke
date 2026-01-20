import SignatureCanvas from "@/components/canvas";
import Stroke from "@/components/demo";
import Footbar from "@/components/footbar";
import HowToUse from "@/components/how-to-use";
import Navbar from "@/components/navbar";
import Preview from "@/components/svgs/preview";
import TryNow from "@/components/svgs/try-now";
import Image from "next/image";


export default function Page(){
  return (
    <div className="w-[95%] relative my-4 md:my-10 py-6 md:py-10 rounded-4xl  bg-[#2943B8] mx-auto overflow-hidden"
    style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 2px, transparent 2px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 2px, transparent 2px)`,
          backgroundSize: "100px 100px, 100px 100px, 20px 20px, 20px 20px",
          backgroundPosition: "-2px -2px, -2px -2px, -1px -1px, -1px -1px",
        }}
    >
      <Navbar/>
        <div className="flex justify-center mt-14 md:mt-28">
            <a href="https://www.producthunt.com/products/stroke?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-stroke" target="_blank" rel="noopener noreferrer"><Image alt="Stroke - Animate SVGs. Beautifully. | Product Hunt" width="250" height="54" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1064890&amp;theme=light&amp;t=1768906926985"/></a>
        </div>
     <h1 className="text-4xl md:text-6xl text-center mt-8 md:mt-16 text-[#FCFFFF] font-semibold">Animate SVGs.
            <br />
      Beautifully.
      </h1>
          <p className="text-xl text-center mt-12 text-[#FCFFFF]/70 px-2"> Hand-drawn SVG animations for logos, signatures, and illustrations.
      </p>
        <div className="absolute top-100 left-10 md:left-10 hidden lg:block">
          <TryNow/>
        </div>
        <SignatureCanvas/>
           <div className="absolute bottom-160 -right-40 hidden lg:block">
          <Preview/>
        </div>
        <HowToUse/>
        <Footbar/>
    </div>
  )
}