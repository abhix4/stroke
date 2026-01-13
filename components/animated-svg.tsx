

import {motion, Variants} from "motion/react"

interface SvgAnimatedProps {
    animatedPaths: string[]
}

export default function SvgAnimated({animatedPaths}: SvgAnimatedProps){
    

      const container: Variants = {
            hidden: {},
            visible: {     
            },
        };
        const child : Variants = {
            hidden: {
                pathLength: 0,
                opacity:0
            },
            visible: (i: number) => ({
            pathLength: 1,
            opacity: 1,
            transition: {
                delay: i * 0.4,
                duration: 2,
                ease: [0.22, 1, 0.36, 1],
            },
            })
        }

    return (
        <motion.svg
            width="800"
            height="400"
            viewBox="0 0 800 400"
            className="mt-6"
            initial="hidden"
            animate="visible"
            preserveAspectRatio="xMidYMid meet"
            variants={container}
        >
            {animatedPaths.map((d, i) => (
              <motion.path
                key={i}
                custom={i}
                d={d}
                stroke="black"
                strokeWidth={3}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              
                variants={child}
              />
            ))}
        </motion.svg>
    )
}

