"use client";
import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";
import Link from "next/link";

import React, { useRef, useLayoutEffect, useState } from "react";

import Fliplink from "./components/Fliplink";
import FlipBtn from "./components/FlipBtn";
import { ArrowBigRight, ArrowUpRight } from "lucide-react";

const Footer = ({ revealMenu }) => {
  const footerRef = useRef(null);
  const text2Ref = useRef(null);
  const footerTriggerRef = useRef(null);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const footerSplit = new SplitText(footerRef.current, {
      type: "chars",
      mask: "chars",
    });
    const context = gsap.context(() => {
      gsap.from(text2Ref.current, {
        scrollTrigger: {
          trigger: footerTriggerRef.current,
          // scrub: true,
          start: "bottom 30%",
          end: "top 30%",
          toggleActions: "restart none reverse none", // <- this makes it replay every time it enters
          // markers: true,
        },
        height: 0,
        duration: 0.5,
        ease: "power1.inOut",
      }).repeat;
      // gsap.from(footerRef.current, {
      //   scrollTrigger: {
      //     trigger: footerTriggerRef.current,
      //     scrub: true,
      //     end: "bottom 20%",
      //     start: "bottom 70% ",
      //     // markers: true
      //   },
      //   y: 50,
      //   scale: 0.8,
      // });
    });
    return () => {
      context.revert();
    };
  }, []);

  return (
    <>
      <div id="Contact" ref={footerTriggerRef} className="sticky top-0"></div>
      <footer
        ref={footerRef}
        className="h-[80vh] bg-primary  sticky bottom-0  flex flex-col gap-5 justify-start pt-40 items-center  text-black"
      >
        <div className="text-sm sm:text-lg md:text-2xl uppercase  font-bold">
          Need an unfair advantage?{" "}
        </div>

        <div
          ref={text2Ref}
          className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl uppercase font-bold bg-hint text-primary flex w-full justify-center overflow-hidden"
        >
          <h1>let's make it happen</h1>
        </div>
        <FlipBtn
          onClick={revealMenu}
          hoverStyle="font-bold text-primary bg-hint cursor-pointer px-7 py-5 rounded-xl text-4xl"
          className="font-bold  text-primary bg-secondary cursor-pointer px-4 md:px-7 py-3 md:py-5 rounded-xl text-2xl md:text-4xl "
        >
         <div className="flex flex-row gap-2">
            <h1>Contact</h1> <ArrowUpRight className="size-8 lg:size-11"/>
          </div>
        </FlipBtn>
          
        
        <div className=" text-secondary w-[95%] gap-5  border-accent p-5 absolute  flex flex-col sm:flex-row justify-between bottom-0 ">


          
<div className="flex flex-row justify-between gap-5 w-full">
  
  
            <div className="flex flex-col w-full  ">
              <h1>Menu</h1>
              <div className="border-t-2 text-sm sm:text-md md:text-2xl flex flex-col font-bold">
                <Fliplink href='#About'>
                <h1>About</h1>
                </Fliplink>
                <Fliplink href='#Skills'>
                <h1>Skills</h1>
                </Fliplink>
                <Fliplink href='#SellectedWork'>
                <h1>Selected Work</h1>
                </Fliplink>
                <Fliplink href='#Contact'>
                <h1>Contact</h1>
                </Fliplink>
              </div>
            </div>
  
  
            <div className="flex flex-col w-full ">
              <h1>Links</h1>
              <div className=" border-t-2 text-sm  sm:text-md md:text-2xl font-bold flex flex-col">
                <Fliplink isdownload={true}  href={'/Ahmed-Haytham-Ahmed-CV-Resume.pdf'} target={'_blank'}>Resume</Fliplink>
                <Fliplink target={'_blank'} href={"https://github.com/maliikx"}>
                  Github
                </Fliplink>
                <Fliplink target={'_blank'} href={"https://www.linkedin.com/in/ahmedhaytham-dev/"}>
                  linkedin
                </Fliplink>
                <Fliplink href={'mailto:Ahmedhaythamwork@gmail.com'} target={'_blank'}>Mail</Fliplink>
              </div>
            </div>
  
</div>

          <div className="text-accent text-xs md:text-xl lg:text-4xl uppercase  font-bold w-fit whitespace-nowrap  flex flex-col  self-end">
            <h1 className="bordher-t-2   font-bold uppercase">
              &copy; 2025 Maliikx-dev
            </h1>
            <h1>all rights reserved</h1>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
