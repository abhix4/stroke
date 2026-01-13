export function generateComponentCode(paths: string[]) {
  return `
'use client'
import {motion, Variants} from "motion/react"


interface SvgAnimatedProps {
   className?: string;
}

export default function Stroke({className}: SvgAnimatedProps) {
  const child : Variants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        delay: i * 0.4,
        duration: 2,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <motion.svg
      viewBox="0 0 800 400"
      className={className ?? "w-full h-auto"}
      preserveAspectRatio="xMidYMid meet"
      initial="hidden"
      animate="visible"
    >
      ${paths
        .map(
          (d, i) => `
      <motion.path
        d="${d}"
        stroke="black"
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={child}
        custom={${i}}
      />`
        )
        .join("\n")}
    </motion.svg>
  );
}
`.trim();
}
