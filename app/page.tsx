import SignatureCanvas from "@/components/canvas";
import Stroke from "@/components/demo";
import Footbar from "@/components/footbar";
import Navbar from "@/components/navbar";
import Preview from "@/components/svgs/preview";
import TryNow from "@/components/svgs/try-now";


export default function Page(){
  return (
    <div className="w-[95%] relative my-10 py-10 rounded-4xl  bg-[#2943B8] mx-auto"
    style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 2px, transparent 2px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 2px, transparent 2px)`,
          backgroundSize: "100px 100px, 100px 100px, 20px 20px, 20px 20px",
          backgroundPosition: "-2px -2px, -2px -2px, -1px -1px, -1px -1px",
        }}
    >
      <Navbar/>
     <h1 className="text-6xl text-center mt-28 text-[#FCFFFF] font-medium">Animate SVGs.
            <br />
      Beautifully.
      </h1>
          <p className="text-xl text-center mt-12 text-[#FCFFFF]/70"> Hand-drawn SVG animations for logos, signatures, and illustrations.
      </p>
        <div className="absolute top-100 left-30">
          <TryNow/>
        </div>
        <SignatureCanvas/>
           <div className="absolute bottom-40 right-0">
          <Preview/>
        </div>
        <Footbar/>
    </div>
  )
}