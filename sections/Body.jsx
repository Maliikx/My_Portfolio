"use client";
import React, { useEffect } from "react";
import { Progress } from "@/components/ui/progress"
import { flushSync } from "react-dom";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { services } from "@/app/data/services";
import Card from "./components/Card";

import { X, ArrowUpRight } from "lucide-react";   
import { useLayoutEffect, useState, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import SplitType from "split-type";
import NextSvg from "./icons/NextSvg";
import { selectedWork } from "@/app/data/selectedWork";
import Link from "next/link";
import TiltedCard from "./components/TiltedCard";
import Skills from "./Skills";
import Image from "next/image";

const titlesStyle = 'text-5xl lg:text-8xl -mt-60 font-bold  border-primary  w-fit  h-fit  px-1  ';

const Body = () => {
  // ── Refs ────────────────────────────────────────────────────────────────────
  const revealRef       = useRef(null);   
  const imgRef          = useRef([]);     
  const bodyRef         = useRef(null);
  const aboutRef        = useRef(null);
  const text1Ref        = useRef(null);
  const text2Ref        = useRef(null);
  const whatRef         = useRef(null);
  const SelectedWorkRef = useRef([]);
  const titleRef        = useRef([]);
  const bannerRef       = useRef([]);
  const descRef         = useRef([]);
  
  const scrollYRef      = useRef(0);

  const isInView = useInView(aboutRef, {
    margin: "200px 0px 0px 0px",
  });

  // Cursor states
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorVar, setCursorVar] = useState("default");
  const [active, setActive] = useState(false);
  const [showSkillInfo, setShowSkillInfo] = useState(false);
  const [SkillInfo, setSkillInfo] = useState('');
  const [SkillDesc, setSkillDesc] = useState('');
  
  // Overlay states
  const [openIndex, setOpenIndex] = useState(null); 
  const openIndexRef   = useRef(null);

  // ── Open handler ────────────────────────────────────────────────────────────
  const handleOpen = useCallback((e, i) => {
    if (openIndexRef.current === i) return;
 
    const revealEl = revealRef.current;
    const imgEl    = imgRef.current[i];
    if (!revealEl || !imgEl) return;
 
    flushSync(() => {
      openIndexRef.current = i;
      setOpenIndex(i);
    });
 
    // Fix Bug 2: Quietly disable ScrollTriggers before modifying body styles
    // This stops GSAP from thinking the page was manually scrolled to 0
    ScrollTrigger.getAll().forEach(trigger => trigger.disable(false, false));

    // Lock scroll smoothly
    scrollYRef.current = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
 
    const startRect = imgEl.getBoundingClientRect();
    const destImg = revealEl.querySelector(".reveal-content img");
    
    // Fix Bug 1: Force an instantaneous aspect-ratio layout calculations pass 
    // to prevent un-cached 0px target measurements on first click
    const srcAspect = startRect.width / startRect.height;
    if (destImg) {
      destImg.style.aspectRatio = `${srcAspect}`;
    }

    const destRect = destImg.getBoundingClientRect();

    gsap.set(destImg, { opacity: 0 });
 
    const clone = document.createElement("img");
    clone.src   = imgEl.src || imgEl.currentSrc || "";
    clone.style.cssText = `
      position: fixed;
      top: 0; left: 0;
      width: ${startRect.width}px;
      height: ${startRect.height}px;
      object-fit: cover;
      border-radius: 8px;
      pointer-events: none;
      will-change: transform, width, height; 
      z-index: 9999;
    `;
    document.body.appendChild(clone);
    
    gsap.set(clone, { x: startRect.left, y: startRect.top });
 
    const VW   = window.innerWidth;
    const VH   = window.innerHeight;
    const atX  = ((e.clientX / VW) * 100).toFixed(2);
    const atY  = ((e.clientY / VH) * 100).toFixed(2);
    const maxR = Math.ceil(
      Math.hypot(
        Math.max(e.clientX, VW - e.clientX),
        Math.max(e.clientY, VH - e.clientY)
      ) * 1.05
    );
 
    const tl = gsap.timeline();
 
    tl.fromTo(
      revealEl,
      { clipPath: `circle(0px at ${atX}% ${atY}%)` },
      { clipPath: `circle(${maxR}px at ${atX}% ${atY}%)`, duration: 0.8, ease: "expo.inOut" }
    )
    .to(
      clone,
      {
        x: destRect.left,
        y: destRect.top,
        width: destRect.width,
        height: destRect.height,
        duration: 0.7,
        ease: "expo.out",
        force3D: true, 
      },
      0.05
    )
    .fromTo(
      revealEl.querySelectorAll(".reveal-content"),
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "power3.out" },
      "-=0.3"
    )
    .then(() => {
      gsap.set(destImg, { opacity: 1 }); 
      clone.remove(); 
      revealEl.setAttribute("data-img-landed", "true");
    });
 
  }, []);
 
  // ── Close handler ───────────────────────────────────────────────────────────
  const handleClose = useCallback(() => {
    const revealEl = revealRef.current;
    if (!revealEl) return;
 
    gsap.to(revealEl.querySelectorAll(".reveal-content"), {
      opacity: 0, y: -10, duration: 0.3, stagger: 0.02, ease: "power2.inOut"
    });
 
    gsap.to(revealEl, {
      clipPath: "circle(0px at 50% 50%)",
      duration: 0.6,
      delay: 0.1,
      ease: "expo.inOut",
      onComplete: () => {
        openIndexRef.current = null;
        setOpenIndex(null);
        revealEl.removeAttribute("data-img-landed");
        
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        
        const html = document.documentElement;
        const prevBehavior = html.style.scrollBehavior;
        html.style.scrollBehavior = 'auto';
        window.scrollTo(0, scrollYRef.current);
        html.style.scrollBehavior = prevBehavior;

        // Safely re-awake triggers now that coordinates are properly restored
        ScrollTrigger.getAll().forEach(trigger => trigger.enable(false, false));
        ScrollTrigger.refresh();
      },
    });
  }, []);
 
  // ── Main Animations & Cleanup ──────────────────────────────────────────────
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const splits = [];

    const context = gsap.context(() => {
      const aboutSplit = new SplitText(aboutRef.current, {type: 'chars'});
      const text1Split = new SplitText(text1Ref.current, { type: "words"});
      const text2Split = new SplitText(text2Ref.current, { type: "words"});
      const whatSplit = new SplitText(whatRef.current, {type: 'chars'});
      
      splits.push(aboutSplit, text1Split, text2Split, whatSplit);

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
        scrollTrigger: {
          trigger: bodyRef.current,
          scrub: 1,
          end: "bottom 20%",
          start: "bottom 70%",
        },
        scaleX: 0.95,
        ease: 'power2.out'
      });

      selectedWork.forEach((_, i) => {
        gsap.to(titleRef.current[i], {
          y: -80,
          scrollTrigger: {
            trigger: SelectedWorkRef.current[i],
            scrub: 1,
            start: "top bottom",
            end: "bottom top",
          },
        });

        gsap.to(bannerRef.current[i], {
          y: -250,
          scrollTrigger: {
            trigger: SelectedWorkRef.current[i],
            scrub: 1,
            start: "top bottom",
            end: "bottom top",
          },
        });

        gsap.to(descRef.current[i], {
          y: -180,
          scrollTrigger: {
            trigger: SelectedWorkRef.current[i],
            scrub: 1,
            start: "top bottom",
            end: "bottom top",
          },
        });
      });
    });

    const handler = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);

    return () => {
      context.revert();
      splits.forEach(split => split.revert()); 
      window.removeEventListener("mousemove", handler);
    };
  }, []);

  // ── Cursor Animations ──────────────────────────────────────────────────────
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
      height: 115,
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

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape" && openIndex !== null) handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClose, openIndex]);

  const work = openIndex !== null ? selectedWork[openIndex] : null;

  return (
    <>
      <motion.div
        variants={variants}
        animate={cursorVar}
        transition={{ type: "spring", stiffness: 250, damping: 25, mass: 0.5 }}
        className={`bg-primary not-md:hidden pointer-events-none fixed flex items-center justify-center top-0 z-50 left-0 w-0 h-0 
          ${showSkillInfo || active ? 'mix-blend-normal' : 'mix-blend-difference'} ${showSkillInfo ? "mt-25 rounded-md" : ""} rounded-full ${active ? "-m-6 opacity-75" : ""}`}
      >
        {active && (
          <h1 className="capitalize text-xl font-medium">VIEW MORE</h1>
        )}
        {showSkillInfo && (
          <div className="flex flex-col justify-start w-full h-full p-2 overflow-hidden shadow-xl">
            <h1 className="capitalize text-xl">
              <span className="font-bold">Name:</span> {SkillInfo}
            </h1>
            <p className="capitalize flex flex-row">"{SkillDesc}"</p>
          </div>
        )}
      </motion.div>
      
      {/* ── Fixed reveal overlay ────────────────────────────────────────── */}
      <div
        ref={revealRef}
        className="fixed inset-0 w-full h-[100svh] z-[80] bg-hint overflow-y-auto overscroll-none touch-pan-y will-change-[clip-path]"
        style={{ 
          clipPath: "circle(0px at 50% 50%)",
          WebkitOverflowScrolling: "touch" 
        }}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        <div className="sticky  top-0 z-[90] flex justify-end px-5 sm:px-8 py-3 bg-hint">
          <button
            onClick={handleClose}
            aria-label="Close"
            className="w-10 h-10 cursor-pointer rounded-full border-2 border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-secondary transition-colors duration-200"
          >
            <X size={18} />
          </button>
        </div>
 
        {work && (
          <div className="flex flex-col gap-8 px-5 sm:px-10 md:px-16 pb-20 pt-2">
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
              <div className="reveal-content opacity-0 shrink-0 w-full sm:w-[38%] md:w-[32%]">
                <img
                  src={work.imgPath}
                  alt={work.title}
                  className="w-full h-auto object-cover rounded-lg border-2 border-[#666] shadow-xl scale-[1.05]"
                />
              </div>
 
              <div className="reveal-content opacity-0 flex flex-col gap-3 sm:pt-2 min-w-0">
                <div className="flex items-baseline gap-2">
                  <h2 className="font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-tighter text-primary">
                    Mission
                  </h2>
                  <pre className="text-xs sm:text-sm text-primary/70 font-mono">(01)</pre>
                </div>
                <p className="text-primary/80 font-semibold text-sm sm:text-base md:text-lg leading-relaxed">
                  {work.mission}
                </p>
                <div className="flex flex-wrap gap-3 mt-2 items-center">
                  <span className="font-bold text-sm bg-primary text-secondary rounded-full py-1 px-3">
                    {work.job}
                  </span>
                  <span className="font-bold text-sm text-primary/50">{work.date}</span>
                  {work.link && (
                    <a
                      href={work.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 font-bold text-sm border-2 border-primary text-primary rounded-full py-1 px-4 hover:bg-primary hover:text-secondary transition-colors duration-200"
                    >
                      Visit Site <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="reveal-content opacity-0 flex flex-col gap-3 pt-6 border-t border-primary/20">
                <div className="flex items-baseline gap-2">
                  <h2 className="font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-tighter text-primary">
                    Challenge
                  </h2>
                  <pre className="text-xs sm:text-sm text-primary/70 font-mono">(02)</pre>
                </div>
                <p className="text-primary/80 font-semibold text-sm sm:text-base md:text-lg leading-relaxed">
                  {work.challenge}
                </p>
              </div>
 
              <div className="reveal-content opacity-0 flex flex-col gap-3 pt-6 border-t border-primary/20">
                <div className="flex items-baseline gap-2">
                  <h2 className="font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-tighter text-primary">
                    Results
                  </h2>
                  <pre className="text-xs sm:text-sm text-primary/70 font-mono">(03)</pre>
                </div>
                <p className="text-primary/80 font-semibold text-sm sm:text-base md:text-lg leading-relaxed">
                  {work.results}
                </p>
              </div>
            </div>
 
            {work.gallery?.length > 0 && (
              <div className="reveal-content opacity-0 flex flex-col gap-5 pt-6 border-t border-primary/20">
                <div className="flex items-baseline gap-2">
                  <h2 className="font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-tighter text-primary">
                    Gallery
                  </h2>
                  <pre className="text-xs sm:text-sm text-primary/70 font-mono">(04)</pre>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {work.gallery.map((img, gi) => (
                    <div key={gi} className="flex flex-col gap-2">
                      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl">
                        <Image
                          src={img.src}
                          alt={img.alt ?? ""}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 90vw, 45vw"
                        />
                      </div>
                      {img.alt && <p className="text-xs sm:text-sm text-primary">{img.alt}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
 
          </div>
        )}
      </div>

      <div
        ref={bodyRef}
        onMouseEnter={textEnter}
        onMouseLeave={textLeave}
        className="text-primary h-fit bg-secondary justify-center rounded-2xl z-10 relative py-10"
      >
        <section className="flex flex-col gap-20 md:gap-40 relative">
          <div className="flex flex-col w-[90%] self-center gap-10 md:gap-20">
            <h1
              ref={aboutRef}
              className="about text-5xl md:text-8xl font-bold border-primary w-fit h-fit text-primary"
            >
              ABOUT ME
            </h1>
            <p ref={text1Ref} id="texty" className="select-none sm:text-xl md:text-3xl lg:text-5xl md:h-[35vh] bg-secondary p-4">
              I'm a dedicated <mark>software engineer</mark> specializing in{" "}
              <mark>front-end</mark> engineering, adept at shaping compelling
              digital experiences for <mark>web and mobile</mark> platforms. that
              captivate audiences and elevate brands. Driven by a passion for
              innovation and constantly weaving my passion into life's tapestry
            </p>
            <p
              ref={text2Ref}
              id="texty2"
              className="sm:text-xl select-none md:text-3xl lg:text-5xl italic bg-secondary text-primary p-4"
            >
              Not only transforming ideas into impactful realities, but giving
              your business an "unfair advantage."
            </p>
            <hr className="border-primary" />
          </div>

          <section id="what" className="flex flex-col gap-10 w-[90%] h-[250vh] self-center">
            <div>
              <h1
                ref={whatRef}
                className="what text-5xl md:text-8xl mt-30 font-bold border-primary w-fit h-fit px-1"
              >
                WHAT I DO?
              </h1>
              <p></p>
            </div>
            <div className="flex h-[150vh]">
              <div className="flex flex-col">
                {services.map((service, index) => (
                  <Card key={index} i={index} {...service} />
                ))}
              </div>
            </div>
          </section>

          <Skills skillEnter_active={skillEnter_active} skillLeave_active={skillLeave_active} />

          <section id="SellectedWork" className="flex px-[5%] flex-col pb-80 self-center gap-80">
            <hr className="border-primary" />
            <h1 className="text-5xl md:text-8xl -mt-60 font-bold border-primary w-fit h-fit px-1">
              SELECTED WORK
            </h1>

            <div className="flex flex-col gap-50 md:gap-120">
              {selectedWork.map((work, i) => (
                <div
                  ref={ref => SelectedWorkRef.current[i] = ref}
                  key={i}
                  className="relative flex flex-col lg:flex-row"
                >

                  <div ref={ref => titleRef.current[i] = ref} className="w-1/2">
                    <h1 className="lg:absolute whitespace-break-spaces uppercase z-[-1] -mt-30 w-[60vw] text-[2rem]/[2rem] md:text-[3rem]/[3rem] lg:text-[10rem]/[10rem] xl:text-[12.5rem]/[15rem] font-bold">
                      {work.title}
                    </h1>
                  </div>

                  <div className="flex w-full lg:items-end flex-col lg:flex-row gap-5">
                    <div
                      onClick={(e) => handleOpen(e, i)}
                      className="cursor-pointer"
                    >
                      <div
                        ref={ref => bannerRef.current[i] = ref}
                        onMouseEnter={textEnter_active}
                        onMouseLeave={textLeave_active}
                        className="relative rounded-xl aspect-[4/3] lg:aspect-[3/4] w-full lg:h-[500px] xl:h-[750px] flex justify-center items-center"
                        style={{ backgroundColor: `#${work.hue || "222222"}` }}
                      >
                        <Image
                          alt=""
                          src="/workBg.jpg"
                          fill
                          className="mix-blend-screen rounded-xl"
                          style={{ objectFit: "cover", opacity: 1 }}
                        />
                        <div className="absolute z-[2] w-[70%] flex flex-col justify-center">
                          <div className="h-2 rounded-md rounded-b-none bg-[#666] flex flex-row items-center gap-1 pl-3" />
                          <img
                            ref={ref => imgRef.current[i] = ref}
                            src={work.imgPath}
                            loading="lazy"
                            alt=""
                            className=" relative border-2 rounded-t-none rounded-md border-[#666] shadow-xl bg-[#666] w-full h-auto"
                          />
                        </div>
                      </div>
                    </div>

                    <div ref={ref => descRef.current[i] = ref} className="flex flex-col justify-between items-center h-full">
                      <pre className="font-bold text-lg not-sm:pl-3.5 self-start">({i + 1})</pre>
                      <div className="flex flex-col gap-2">
                        <p className="text-xl lg:text-3xl">{work.description}</p>
                        <div className="font-bold text-lg bg-primary text-secondary rounded-full w-fit py-1 px-3">
                          {work.job}
                        </div>
                        <div className="font-bold text-2xl">{work.date}</div>
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