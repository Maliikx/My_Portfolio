'use client'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useLayoutEffect, useRef, useState } from "react";



export default function Card({ i, title, number, content, quote, className = '' }) {
  const [top, setTop] = useState(`calc(-10% + ${i * 100}px)`);

  const servicesRef = useRef(null);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setTop(`calc(-20% + ${i * 80}px)`);
      } else if (window.innerWidth < 640) {
        setTop(`calc(-10% + ${i * 50}px)`);

    }else {
      setTop(`calc(-10% + ${i * 100}px)`);
    }
  }
    handleResize(); // set on mount
    window.addEventListener('resize', handleResize);

    gsap.registerPlugin(ScrollTrigger);


    gsap.set(servicesRef.current, { opacity: 1 });

    

    gsap.from(servicesRef.current, {
      scrollTrigger: {
        trigger: servicesRef.current,
        scrub: true,
        end: " 30% 50%",
        start: " 70% 50% ",
        // markers: "true",
      },
      scale: 0.7,
      opacity: 0,
      y:50,

      
      // x:-200,
      ease:'power1.inOut'
    });
    ScrollTrigger.refresh();
    return () => window.removeEventListener('resize', handleResize);



  
   
  }, [i])
  
  return (
    <div ref={servicesRef} className={`${className}   border- text-lg sm:text-2xl md:text-4xl lg:text-6xl sticky   flex justify-center items- flex-col top-5 h-[40vh]  `}>
      <div
        style={{ top }}
        className="bg-secondary border-t border-primary origin-top h-40  p-4 flex flex-col   relative"
      >
        <div className="flex justify-between">
          <h1 className="  font-bold  ">{title}</h1>
        </div>
        <div className="bg-secondary  text-[#b4b0aa] py-8 md:p-8    flex justify-between">
          <div className=" flex flex-col gap-5">
            {/* <p className="text-4xl w-[90%] ">{content}</p> */}
            <p className="text-sm sm:text-xl md:text-3xl lg:text-5xl w-[90%] text-[#888] italic">{quote}</p>
          </div>
          <pre className=" bg-hint h-fit text-[7rem]/[4rem] sm:text-[10rem]/[5rem] md:text-[15rem]/[8rem] lg:text-[18rem]/[10rem] relative right-0 text-[#222]">
            0{i+1}
          </pre>
        </div>
      </div>
    </div>
  );
}
