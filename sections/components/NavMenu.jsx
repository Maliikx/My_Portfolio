import React from 'react'
const itemsStyle = 'navItem bg-secondary cursor-pointer origin-right flex justify-center items-center p-5 rounded text-primary hover:bg-primary hover:text-secondary'

const NavMenu = () => {
  return (
    <>
    <nav className='flex text-xl font-bold uppercase flex-row-reverse fixed z-11 pb-10 -rotate-90 origin-right top-0 right-0  w-fit  gap-2 '>
        <span className={itemsStyle}>Home</span>
        <span className={itemsStyle}>Resume</span>
        <span className={itemsStyle}>Work</span>
        </nav>

    {/* <div className='flex flex-row fixed z-11 pb-10  bottom-0 bg-gradient-to-t from-black/75 from-blur to-transparent w-full justify-center items-center gap-2 '>
        <span className={itemsStyle}>Home</span>
        <span className={itemsStyle}>About</span>
        <span className={itemsStyle}>Work</span>
        <span className='navItem bg-hint text-primary hover:bg-primary hover:text-secondary'>Contact</span>
    </div> */}
    </>
    
  )
}

export default NavMenu;