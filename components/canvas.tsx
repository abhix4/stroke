'use client';

import React, { useRef, useEffect, useState } from 'react';
import { BrushCleaning, Tangent } from 'lucide-react';
import SvgAnimated from '@/components/animated-svg';
import { generateComponentCode } from '@/lib/demo';

type Point = { x: number; y: number };

export default function SignatureCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [replayKey, setReplayKey] = useState(0)
  const drawing = useRef(false);
  const points = useRef<Point[]>([]);
  const strokes = useRef<Point[][]>([]);

  const velocity = useRef(0);
  const width = useRef(3.5);

  const [svgPaths, setSvgPaths] = useState<string[]>([]);
  const [codeCopied, setCodeCopied] = useState<boolean>(false)

  
  /*  Canvas setup  */
  useEffect(() => {
    const ctx = canvasRef.current!.getContext('2d')!;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#000';
  }, []);

  /*  Pointer mapping  */
  const getPoint = (e: React.PointerEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  /*  smoothing */
  const stabilize = (prev: Point, next: Point): Point => ({
    x: prev.x + (next.x - prev.x) * 0.55,
    y: prev.y + (next.y - prev.y) * 0.55,
  });

  const strokeWidth = (a: Point, b: Point) => {
    const v = Math.hypot(b.x - a.x, b.y - a.y);
    velocity.current = velocity.current * 0.6 + v * 0.4;

    const target = Math.max(1.8, Math.min(5.2, 6 - velocity.current * 0.4));
    width.current = width.current * 0.7 + target * 0.3;

    return width.current;
  };

  /*Drawing */
  const start = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);

    drawing.current = true;
    points.current = [getPoint(e)];
    velocity.current = 0;
    width.current = 3.5;
  };

  const move = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    e.preventDefault();

    const ctx = canvasRef.current!.getContext('2d')!;
    const pts = points.current;

    const raw = getPoint(e);
    const prev = pts[pts.length - 1];
    const next = stabilize(prev, raw);
    pts.push(next);

    if (pts.length < 3) return;

    const p0 = pts[pts.length - 3];
    const p1 = pts[pts.length - 2];
    const p2 = pts[pts.length - 1];

    ctx.lineWidth = strokeWidth(p1, p2);

    const m1 = { x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 };
    const m2 = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };

    ctx.beginPath();
    ctx.moveTo(m1.x, m1.y);
    ctx.quadraticCurveTo(p1.x, p1.y, m2.x, m2.y);
    ctx.stroke();
  };

  const stop = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;

    drawing.current = false;
    strokes.current.push([...points.current]);
    points.current = [];
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  /*   export */
  const buildSvg = () => {
    const paths = strokes.current.map(stroke => {
      if (stroke.length < 2) return '';

      let d = `M ${stroke[0].x} ${stroke[0].y}`;
      for (let i = 1; i < stroke.length - 1; i++) {
        const p1 = stroke[i];
        const p2 = stroke[i + 1];
        d += ` Q ${p1.x} ${p1.y} ${(p1.x + p2.x) / 2} ${(p1.y + p2.y) / 2}`;
      }
      return d;
    });

    // const svgString = `<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg"><path d="${paths.join(' ')}" stroke="#000" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>`;
      
    //   navigator.clipboard.writeText(svgString);
    //   setSvgPaths(paths);
    setReplayKey(key => key+1)
    setSvgPaths(paths);
  };

  const clear = () => {
    const ctx = canvasRef.current!.getContext('2d')!;
    ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    strokes.current = [];
    setSvgPaths([]);
  };

  const copyFullComponent = async () => {
    const code = generateComponentCode(svgPaths);
    await navigator.clipboard.writeText(code);
    setCodeCopied(true)
  };

  useEffect(() => {
    if(!setCodeCopied) return;
    setTimeout(()=> {
      setCodeCopied(false)
    },2000)
  },[codeCopied])

  const updateKey = () => {
      setReplayKey(key => key+1)
  }


  return (
    <div className="p-6">
      <div className="w-full max-w-4xl mx-auto mt-8 md:mt-18">
        
          <div className="flex rounded-t-lg overflow-hidden">
          <button
            onClick={buildSvg}
            className="flex-1 bg-[#FE9D36] text-white py-3 flex items-center justify-center gap-2 "
          >
            <Tangent size={18} />Animate 
          </button>

          <button
            onClick={clear}
            className="bg-[#48BB67] text-white px-5 flex items-center gap-2"
          >
            <BrushCleaning size={18} />Clear
          </button>
          </div>
        <canvas
          ref={canvasRef}
          width={800}
          height={400}
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={stop}
          onPointerLeave={stop}
          className="w-full bg-neutral-50  rounded-b-lg touch-none cursor-crosshair"
        />

      

        <div className='bg-neutral-50 rounded-lg relative '>
         <div className='absolute right-4 top-4 flex items-center justify-center gap-2'> 
           <button className='bg-[#FEF102] p-2 text-sm rounded-lg shadow-sm shadow-black/10 ring-1 ring-black/10 cursor-pointer active:scale-99' title='replay' onClick={updateKey}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-refresh-ccw-icon lucide-refresh-ccw"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg></button>
          <button className=' bg-[#FEF102] p-2 text-sm rounded-lg shadow-sm shadow-black/10 ring-1 ring-black/10 cursor-pointer active:scale-99' title='copy code' onClick={copyFullComponent}>{codeCopied ? "code copied": "copy code"}</button>
         </div>
          <SvgAnimated animatedPaths={svgPaths} key={replayKey}/> 
        </div>
      </div>
    </div>
  );
}
