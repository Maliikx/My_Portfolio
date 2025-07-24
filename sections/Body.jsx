"use client";
import React from "react";
import { Progress } from "@/components/ui/progress"

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { services } from "@/app/data/services";
import Card from "./components/Card";

import { useLayoutEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import SplitType from "split-type";
import NextSvg from "./icons/NextSvg";
import { selectedWork } from "@/app/data/selectedWork";
import Link from "next/link";
import TiltedCard from "./components/TiltedCard";
import Skills from "./Skills";
import Image from "next/image";


const titlesStyle = 'text-5xl lg:text-8xl -mt-60 font-bold  border-primary  w-fit  h-fit  px-1  '

const Body = () => {
  const bodyRef = useRef(null);
  const aboutRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const whatRef = useRef(null);
  const SelectedWorkRef = useRef([]);
  const titleRef = useRef([]);
  const bannerRef = useRef([]);
  const descRef = useRef([]);



  const isInView = useInView(aboutRef, {
    margin: "200px 0px 0px 0px",
  });

  // cursor effects
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorVar, setCursorVar] = useState("default");
  const [active, setActive] = useState(false);
  const [showSkillInfo, setShowSkillInfo] = useState(false);
  const [SkillInfo, setSkillInfo] = useState('');
  const [SkillDesc, setSkillDesc] = useState('');
  useLayoutEffect(() => {
    

    const aboutSplit = new SplitText(aboutRef.current, {type: 'chars'});
    const text1Split = new SplitText(text1Ref.current, { type: "words"});
    const text2Split = new SplitText(text2Ref.current, { type: "words"});
    const whatSplit = new SplitText(whatRef.current, {type: 'chars'});
    // gsap.set(aboutSplit.chars, { opacity: 0. });

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context( ()=>{

    gsap.from(aboutSplit.chars, {
      scrollTrigger: {
        trigger: aboutSplit.chars,
        scrub: true,
        start: " 80% top ",
        end: " 50% top",
        // markers: "true",
      },
      stagger: 0.05,
      y:10,
      x:-10,
      scale:0.9,

      opacity: 0.2,
    },
  
  );
    gsap.from(text1Split.words, {
      scrollTrigger: {
        trigger: text1Split.words,
        scrub: "true",
        start: "bottom bottom-=100px",
        end: "top 30%",
        // markers: "true",
      },
      opacity: 0.2,
      y:10,
      x:-10,
      scale:0.9,
      stagger: 0.08,
    });
    gsap.from(text2Split.words, {
      scrollTrigger: {
        trigger: text2Split.words,
        scrub: "true",
        start: "bottom bottom-=200px",
        end: "top 30%",
        // markers: "true",
      },
      opacity: 0.2,
      y:10,
      x:-10,
      scale:0.9,

      stagger: 0.08,
    });

    
    gsap.from(whatSplit.chars, {
      scrollTrigger: {
        trigger: whatSplit.chars,
        scrub: true,
        start: " 80% top ",
        end: " 50% top",
        // markers: "true",
      },
      opacity: 0.2,
      y:10,
      x:-10,
      scale:0.9,
      stagger: 0.08,

    });
    gsap.to(bodyRef.current, {
      scrollTrigger:{
        trigger: bodyRef.current,
        scrub: true,
        end: "bottom 20%",
        start: "bottom 70% ",
        // markers: true
      },
      scaleX: 0.95,
      ease:'power1.out'
    });
    
    selectedWork.forEach((_, i) => {
      gsap.to(titleRef.current[i], {
        y: -80,
        scrollTrigger: {
          trigger: SelectedWorkRef.current[i],
          scrub: true,
          start: "top bottom",
          end: "bottom top",
          // markers: true,
        },
      });
  
      gsap.to(bannerRef.current[i], {
        y: -250,
        scrollTrigger: {
          trigger: SelectedWorkRef.current[i],
          scrub: true,
          start: "top bottom",
          end: "bottom top",
          // markers: true,
        },
      });
  
      gsap.to(descRef.current[i], {
        y: -180,
        scrollTrigger: {
          trigger: SelectedWorkRef.current[i],
          scrub: true,
          start: "top bottom",
          end: "bottom top",
          // markers: true,
        },
      });
    });
  

      
    });



    const handler = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handler);

    return () => {
      context.revert();
      window.removeEventListener("mousemove", handler);
    };
    

  }, []);
  const variants = {
    default: {
      x: mousePos.x - 14,
      y: mousePos.y - 14,
    },
    text: {
      height: 45,
      width: 45,
      x: mousePos.x - 22.5,
      y: mousePos.y - 22.5,
    },
    active: {
      height: 120,
      width: 120,
      x: mousePos.x - 60,
      y: mousePos.y - 60,
    },
    showSkillInfo: {
      width: 300,
      height: 100,
      x: mousePos.x - 150,
      y: mousePos.y - 100,
      
    },
  };
  const textEnter = () => setCursorVar("text");
  const textLeave = () => setCursorVar("default");

  const textEnter_active = () => {
    setCursorVar("active");
    setActive(true);
  };
  const textLeave_active = () => {
    setCursorVar("text");
    setActive(false);
  };
  const skillEnter_active = (info, desc) => {
    setCursorVar("showSkillInfo");
    setSkillInfo(info);
    setSkillDesc(desc);
    setShowSkillInfo(true);
  };
  const skillLeave_active = () => {
    setCursorVar("text");
    setSkillInfo('');
    setSkillDesc('');
    setShowSkillInfo(false);
  };
 

  return (
    <>
      <motion.div
        variants={variants}
        animate={cursorVar}
        className={`bg-primary not-md:hidden  pointer-events-none fixed flex items-center justify-center top-0 z-50 left-0  w-0 h-0 
          ${showSkillInfo || active ? ' mix-blend-normal' : 'mix-blend-difference'} ${showSkillInfo ? "mt-25 rounded-md " : ""} rounded-full ${active ? "-m-6 opacity-75" : ""}`}
      >
        {active && 
          <h1 className={` capitalize text-xl font-medium `}>
          VEIW MORE
        </h1>
        }
        {showSkillInfo && 
          <div className="flex flex-col justify-start w-full h-full p-2 overflow-hidden shadow-xl">
            <h1 className={` capitalize text-xl `}>
            <span className="font-bold">Name:</span> {SkillInfo}</h1>
            <p className={` capitalize  flex flex-row`}>
            <span className="font-bold"></span> "{SkillDesc}"
             </p>
          </div>
        }
        
      </motion.div>
    
      <div
        ref={bodyRef}
        onMouseEnter={textEnter}
        onMouseLeave={textLeave}
        className=" text-primary h-fit bg-secondary  justify-center rounded-2xl z-10  relative py-10"
      >
       
      
        <section className="flex flex-col gap-20 md:gap-40   relative ">
          <div className=" flex flex-col w-[90%] self-center gap-10 md:gap-20  ">
            <h1
              ref={aboutRef}
              className={`about text-5xl md:text-8xl font-bold border-primary w-fit  h-fit  text-primary`}
            >
              ABOUT ME
            </h1>
            <p ref={text1Ref} id="texty" className="sm:text-xl md:text-3xl lg:text-5xl  md:h-[35vh] bg-secondary p-4">
              I'm a dedicated <mark>software engineer</mark> specializing in{" "}
              <mark>front-end</mark> engineering, adept at shaping compelling
              digital experiences for <mark>web and mobile</mark> platforms. that
              captivate audiences and elevate brands. Driven by a passion for
              innovation and constantly weaving my passion into life's tapestry
            </p>
            <p
            ref={text2Ref}
              id="texty2"
              className="sm:text-xl md:text-3xl lg:text-5xl italic bg-secondary text-primary  p-4"
            >
              Not only transforming ideas into impactful realities, but giving
              your business an "unfair advantage."
            </p>
            {/* <p className="text-4xl bg-[#222]   h-fit  p-4">
            I'm a dedicated <mark>software engineer</mark> specializing in <mark>front-end engineering</mark>, adept at shaping compelling digital experiences for <mark>web and mobile</mark> platforms. With a meticulous eye for detail, From initial wireframes to polished designs and seamless development to deliver polished solutions that captivate audiences and elevate brands. Driven by a passion for innovation, <mark>not only transforming ideas into impactful realities, but give your business an unfair advantage.</mark>
            </p> */}
            <hr className="border-primary" />
          </div>
          {/* Second section */}
          <section
            id="what"
            className=" flex flex-col gap-10 w-[90%] h-[250vh] self-center "
          >
            <div className=" ">
              <h1
                ref={whatRef}
                className="what text-5xl md:text-8xl mt-30 font-bold  border-primary w-fit  h-fit  px-1    "
              >
                WHAT I DO?
              </h1>
              <p></p>
            </div>
            <div
            // ref={servicesRef}
            className=" flex h-[150vh] ">
              <div className="flex flex-col  ">
                {services.map((service, index) => {
                  return <Card  key={index} i={index} {...service} />;
                })}
              </div>
            </div>
          </section>
          {/* Second section end */}
          <Skills skillEnter_active={skillEnter_active} skillLeave_active={skillLeave_active} />
          {/* third section */}
          <section id="SellectedWork"  className=" flex flex-col w-[90%]  pb-80 self-center gap-80">
            <hr className="border-primary " />
            <h1 className="text-5xl md:text-8xl -mt-60 font-bold  border-primary  w-fit  h-fit  px-1  ">
              SELECTED WORK
            </h1>
            <div  className="flex flex-col gap-50 md:gap-120 ">
            {selectedWork.map((work, i)=>(
                <div ref={ref => SelectedWorkRef.current[i]= ref} key={i}  className="flex flex-col lg:flex-row ">
                <div ref={ref => titleRef.current[i]= ref} className=" w-1/2 ">
                  <h1 className="lg:absolute   uppercase z-[-1] -mt-30 w-[60vw] wrap-break-word text-[2rem]/[2rem] md:text-[3rem]/[3rem] lg:text-[10rem]/[10rem]   xl:text-[15rem]/[18rem] font-bold">
                    {work.title}
                  </h1>
                </div>
                <div className="flex w-full lg:items-end flex-col lg:flex-row gap-5">
                  <Link target="_blank" href={work.link}>
                    {/* <TiltedCard
                    imageSrc="bginci.jpg"
                    altText="Kendrick Lamar - GNX Album Cover"
                    captionText="Kendrick Lamar - GNX"
                    containerHeight="750px"
                    containerWidth="550px"
                    imageHeight="750px"
                    imageWidth="550px"
                    rotateAmplitude={12}
                    scaleOnHover={1.1}
                    showMobileWarning={false}
                    showTooltip={true}
                    displayOverlayContent={true}
                    overlayContent={
                      <p className="tilted-card-demo-text">
                        INCI-FLEX-EGYPT
                      </p>
                    }
                    /> */}
                    <div
                      ref={ref => bannerRef.current[i]= ref}
                      onMouseEnter={textEnter_active}
                      onMouseLeave={textLeave_active}
                      className="relative rounded-xl  bg-[#077bb5] aspect-[4/3] lg:aspect-[3/4] w-full  lg:h-[500px] xl:h-[750px]  flex justify-center items-center"
                    >
                      {/* <img
                        className=" object-cover opacity-30 h-full"
                        src="./bginci.jpg"
                        alt=""
                      /> */}
                      <Image
                      alt=""
                      src={'/bginci.jpg'}
                      fill
                      className=" filter grayscale"
                      style={{ objectFit: 'cover', opacity: 0.3}}
                      />
                      <div className=" absolute z-[2] w-[70%] flex flex-col justify-center ">
                        <div className="h-2 rounded-md rounded-b-none bg-[#666] flex flex-row items-center gap-1 pl-3 ">
                         
                          </div>
                          <img
                            className=" relative  border-2 rounded-t-none  rounded-md border-[#666] shadow-xl"
                            src={work.imgPath}
                            alt=""
                            loading="lazy"
                          />
                      </div>
                    </div>
                  </Link>
                  <div ref={ref => descRef.current[i] = ref} className="  flex flex-col justify-between items-center h-full">
                    <pre className=" font-bold text-lg not-sm:pl-3.5 self-start">({i+1})</pre>
                    <div className="w-72 flex flex-col  gap-2">
                      {" "}
                      <p className=" text-xl lg:text-3xl   ">
                        {work.description}
                      </p>
                        <div className=" font-bold  text-xl bg-primary text-secondary rounded-full  w-fit px-2">{work.job}</div>
                        <div className=" font-bold  text-2xl">{work.date}</div>
                    </div>
                  </div>
                </div>
                </div>
              ))}
              </div>
          </section>
        </section>
      </div>
    </>
  );
};

export default Body;
