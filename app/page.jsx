'use client'
import Image from "next/image";
import Header from "@/sections/Header";
import Body from "@/sections/Body";
import Footer from "@/sections/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import { useScroll, motion, useTransform } from "framer-motion";
import NavBar from "@/sections/components/NavMenu";
import { useState, useRef, useEffect } from "react";
import Contact from "@/sections/components/Contact";
import NavMenu from "@/sections/components/NavMenu";

export default function Home() {
  const [showMenu, setShowMenu] = useState(false);
  const revealRef = useRef(null);
  const numberOfBars = 6; // ← change this number as needed

  const revealMenu = () => {
    setShowMenu(prev => !prev);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    const context = gsap.context(()=>{
      gsap.to('.reveal',{
        y: '-100%',
        duration: 0.5,
        stagger: 0.08,
        ease: 'power1.in',
        backgroundColor: '#e7e2dd'

       
      })
    })
  
    return () => {
      context.revert;
    }
  }, [])
  


  
  return (
    <>
          {/* <NavMenu/> */}

        <Contact />

        <div
            onClick={() => setShowMenu(false)}
            className={`fixed inset-0 h-screen w-[100vw]  bg-black/30 z-40 transition-all duration-700 ease-in-out
              ${showMenu ? '-translate-x-[80vw] md:-translate-x-[40vw] opacity-100 pointer-events-auto' : 'translate-x-0 opacity-0 pointer-events-none'}
            `}
          ></div>


    <div  ref={revealRef} className=" pointer-events-none   flex flex-row fixed inset-0 z-40 ">
    {Array.from({ length: numberOfBars }).map((_, index) => (
        <div
          key={index}
          className="reveal rounded-b-4xl  h-[105vh] bg-secondary"
          style={{ width: `${100 / numberOfBars}%` }} 
        />
      ))}
    </div>
    <main id="About"  className={`bg-primary  transition-all duration-700 ease-in-out  ${ showMenu? '-translate-x-[80vw] md:-translate-x-[40vw]  ':''}`}>

      {/* <div onClick={revealMenu}  className="bg-black/90 fixed  z-100 w-screen h-screen"></div> */}
      
      {/* <NavBar/> */}
      {/* <div className=" fixed  top-0 z-50 left-[95%] flex  w-full ">
        <div className="   bg-hint flex w-fit h-fit p-6 border border-secondary">
          <Menu className=" text-primary" size={40} />
        </div>
        <div className=" bg-fuchsia-600 h-[100vh] w-1/4"></div>
      </div> */}

      <Header />

      <div>


          <Body />

        <Footer revealMenu={revealMenu}  />
      </div>
    </main>
    </>
  );
}
