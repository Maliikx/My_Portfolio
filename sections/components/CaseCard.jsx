'use client'
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { MousePointer2, MousePointer2Icon, MousePointerClick, MousePointerClickIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";


export const CaseCard = ({project}) => {
    
    const cardRef = useRef();
    const containerRef = useRef();
    useEffect(() => {
        if (cardRef.current) {
            // 1. Set perspective on the parent for 3D depth
            gsap.set(containerRef.current, { perspective: 1200 });        
            // 2. Animate rotationX for the backflip
            gsap.to(cardRef.current, {
              rotationX: 180, // A full backflip
              ease: "power4.inOut",
              scrollTrigger: {
                trigger: cardRef.current,
                start: "50% 55%",
                end: "50% 20%",
                // markers: true,
                // toggleActions: "play none none reverse", 
                scrub: true,

              },
            });
          }
    }, []);
  return (
    <Link href={project.link}>
    <div ref={containerRef} className="relative px-[5%] lg:px-0 ">

        <div ref={cardRef}  className="p-5 relative w-full   sm:h-fit preserve-3d bg-secondary flex flex-col gap-5 items-center justify-center rounded-xl ">
            <Image
            className={`object-cover relative rounded-lg  overflow-hidden hover:scale-97 hover:cursor-pointer  transition-all duration-200 ease-in-out`} 
        
            src={project.imgPath}
            alt={project.title}
            width={900}
            height={500}
            />
            <div className="flex flex-row justify-between w-full">
            <h1 className="text-primary text-lg lg:text-3xl font-bold uppercase">{project.title}</h1>
            {/* <MousePointer2 size={60} className="text-primary p-3 rounded-2xl absolute top-0 right-0  bg-secondary"/> */}
            <MousePointerClick size={60} className="text-primary p-3 rounded-2xl absolute top-0 right-0  bg-secondary" />
            {/* <button className="bg-hint cursor-pointer text-lg text-primary font-bold rounded-xl uppercase  w-fit py-1 px-3  hover:text-secondary hover:bg-primary">Visit Website</button> */}
            </div>
            <div className="flex flex-row justify-between w-full">

            <span className=" font-bold  tet-md bg-primary text-secondary rounded-full  w-fit py-1 px-3">{project.job}</span>
            <span className="text-xl font-bold text-primary ">{project.date}</span>
            </div>

            {/* <p className="text-primary ">{project.description}</p> */}
                
            <div 
                  style={{ backgroundColor: `#${project.hue || "222"}` }}
            className="absolute min-h-120 sm:min-h-0 inset-0 backface-hidden rotate-x-180 bg-white rounded-xl flex items-center justify-center p-5 lg:p-10 z-10">
                <div className="text-start">
                <div className="flex text-primary   ">
                  <h1 className="  font-bold text-3xl md:text-4xl lg:text-6xl text-primary ">Mission</h1>
                  <pre className=" lg:text-2xl">(01)</pre>
                </div>
                    <p className="text-primary   md:text-2xl">{project.mission}</p>
                </div>
             </div>
        </div>
    </div>

   

  
   {/* <div
      style={{ backgroundColor: `#${project.hue || "222"}` }}
   
   className="w-full h-full flex absolute -z-20  bg-hint"></div> */}
   </Link>
  )
}
