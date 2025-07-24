import React from 'react'
import {motion} from 'framer-motion'
import Link from 'next/link'

const FlipBtn = ({children, onClick , className = '', hoverStyle = '', type}) => {
  return (
    <motion.button
    type={type}
    onClick={onClick}
    initial={'initial'}
    whileHover={'hovered'}
    className={`relative cursor-pointer  overflow-hidden whitespace-nowrap w-fit  ${className}`}
    >
        <motion.div
          transition={{ ease: 'easeInOut', duration: 0.2 }}

         variants = {{
            initial: {y: 0},
            hovered: {y: '-100%',}
        }}
        >
        {children}
        </motion.div>
        <motion.div
          transition={{ ease: 'easeInOut', duration: 0.2 }}
          className={`absolute inset-0   ${hoverStyle}`}
         variants = {{
            initial: {y: '100%'},
            hovered: {y: 0,}
        }}
        >
        {children}
        </motion.div>
    </motion.button>
  )
}

export default FlipBtn