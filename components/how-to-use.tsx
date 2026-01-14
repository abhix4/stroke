export default function HowToUse() {
  return (
    <div className="max-w-4xl mx-auto text-[#FCFFFF] mt-18 px-4">
      <h2 className="text-2xl">How to use</h2>

      <ol className="flex flex-col gap-1 mt-4">
        <li>
          Draw in the <span className="text-[#FE9D36]">canvas</span>
        </li>
        <li>
          <span className="text-[#FE9D36]">Copy</span> the generated code
        </li>
        <li>
          Paste it into a React or Next.js component
        </li>
        <li>
          Install <a href="https://motion.dev/docs/react"><span className="text-[#FE9D36]">motion</span></a>
        </li>
        <li>
          Resize using the <span className="text-[#FE9D36]">className</span> prop
        </li>
         <li>
          Change color using <span className="text-[#FE9D36]">color</span> prop
        </li>
      </ol>

      <h2 className="2xl mt-12">Usage</h2>
      <p className="mt-2">
        {`<Stroke className="w-100 h-auto" color="yellow"/>`}
      </p>
    </div>
  );
}
