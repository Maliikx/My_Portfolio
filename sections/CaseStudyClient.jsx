"use client";
import React, { useEffect, useRef, useState } from "react";
import { CaseCard } from "./components/CaseCard";
import { ArrowDown } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "./Footer";
import Contact from "./components/Contact";
import Image from "next/image";


gsap.registerPlugin(ScrollTrigger);

// ─── Reusable section block ───────────────────────────────────────────────────
const Section = ({ label, number, children, stickyTop = "top-10", className = "" }) => (
  <div
    className={` sticky flex flex-col ${stickyTop} ${className}`}
  >
    <div className="bg-secondary  border-primary gap-5 p-4 flex flex-col relative">
      <div className="flex gap-2">
        <h1 className="font-bold text-3xl md:text-4xl lg:text-6xl">{label}</h1>
        <pre className="lg:text-2xl">{number}</pre>
      </div>
      <div className="text-[#888] flex flex-col gap-5">{children}</div>
    </div>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────
export const CaseStudyClient = ({ project }) => {
  const numberOfBars = 6;

  const containerRef  = useRef(null);
  const titleRef      = useRef(null);
  const cardRef       = useRef(null);
  const challengeRef  = useRef(null);
  const resultsRef    = useRef(null);
  const galleryRef    = useRef(null);

   // cursor effects
   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
   const [cursorVar, setCursorVar] = useState("default");
   const [active, setActive] = useState(false);
   

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // ── 1. Bar reveal (page enter) ──────────────────────────────────────────
      const tl = gsap.timeline();

      tl.to(".reveal-bar", {
        y: "-100%",
        duration: 0.5,
        stagger: 0.08,
        ease: "power1.in",
        backgroundColor: "#e7e2dd",
      })
      // ── 2. Hero title slides up after bars leave ────────────────────────────
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "-=0.1"
      )
      // ── 3. CaseCard fades in right after ───────────────────────────────────
      .fromTo(
        cardRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      );

      // ── 4. Hero fades out on scroll ────────────────────────────────────────
      gsap.to(containerRef.current, {
        opacity: 0,
        zIndex: -1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "bottom -10%",
          end: "bottom top",
          scrub: true,
        },
      });

      // ── 5. Scroll-triggered reveals ────────────────────────────────────────
      const scrollReveal = (target) =>
        gsap.fromTo(
          target,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: target,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

      scrollReveal(challengeRef.current);
      scrollReveal(resultsRef.current);
      scrollReveal(galleryRef.current);

      // ── 6. Gallery images staggered in ────────────────────────────────────
      gsap.fromTo(
        ".gallery-item",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
    const handler = (e) => {
        setMousePos({ x: e.clientX, y: e.clientY });
      };
      window.addEventListener("mousemove", handler);
      

    return () =>{

        ctx.revert();
        window.removeEventListener("mousemove", handler);
    } 

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

  return (
    <>
       <motion.div
        variants={variants}
        animate={cursorVar}
        className={`bg-primary not-md:hidden  pointer-events-none fixed flex items-center justify-center top-0 z-50 left-0  w-0 h-0 
          ${active ? ' mix-blend-normal' : 'mix-blend-difference'}  rounded-full ${active ? "-m-6 opacity-75" : ""}`}
      >
        {active && 
          <h1 className={` capitalize text-xl font-medium `}>
          VEIW MORE
        </h1>
        }
        
        
      </motion.div>
    
      <Contact />

      {/* ── Bar reveal overlay ─────────────────────────────────────────────── */}
      <div className="pointer-events-none flex flex-row fixed inset-0 z-40">
        {Array.from({ length: numberOfBars }).map((_, i) => (
          <div
            key={i}
            className="reveal-bar rounded-b-4xl h-[105vh] bg-secondary"
            style={{ width: `${100 / numberOfBars}%` }}
          />
        ))}
      </div>

      <main className="bg-primary">
        {/* ── Hero (sticky, fades out on scroll) ────────────────────────────── */}
        <div
          ref={containerRef}
          className="flex h-[160svh] bg-primary overflow-hidden sticky   sm:p-0 top-0 z-10 flex-row gap-10 items-start justify-center"
        >
          {/* Scroll hint */}
          <div className="fixed uppercase flex bottom-10 z-[8] text-xl sm:text-2xl items-center animate-bounce">
            <h1>Scroll down</h1>
            <ArrowDown />
          </div>

          {/* Title + card */}
          <div className="flex h-svh sticky top-0 text-secondary   sm:gap-0  flex-col items-center justify-around pb-[33.3333333%] sm:p-0  sm:justify-center">
            <h1
              ref={titleRef}
              className="text-center sm:text-start text-[5rem] xs:text-[2.5rem] sm:text-[3rem] md:text-[4rem] leading-16 lg:text-[5rem] xl:text-8xl   sm:leading-5 md:leading-7 lg:leading-9 xl:leading-11 uppercase font-bold opacity-0"
            >
              Click for more
            </h1>

            <div ref={cardRef} className="opacity-0">
              <CaseCard project={project} />
            </div>
          </div>
        </div>

        {/* ── Content panel ─────────────────────────────────────────────────── */}
        <main
        onMouseEnter={textEnter}
        onMouseLeave={textLeave}
        className="min-h-[100svh] p-[5%] flex flex-col gap-10 rounded-2xl bg-secondary relative z-[12] text-primary w-full">

          {/* Challenge */}
          <div ref={challengeRef}>
            <Section label="Challenge" number="(02)" stickyTop="top-10">
              <p className="text-[16px] sm:text-lg md:text-xl lg:text-3xl w-full">
                {project.challenge}
              </p>
            </Section>
          </div>

          {/* Results */}
          <div ref={resultsRef} >
            <Section className="border-t sticky top-35" label="Results" number="(03)" stickyTop="top-36">
              <p className="text-[16px]  sm:text-lg md:text-xl lg:text-3xl w-full">
                {project.results}
              </p>
            </Section>
          </div>

          {/* Gallery */}
          <section
            ref={galleryRef}
            className="flex bg-secondary p-4 gap-6 relative border-t border-primary flex-col justify-between"
          >
            <div className="flex gap-2">
              <h1 className="font-bold text-3xl md:text-4xl lg:text-6xl">Gallery</h1>
              <pre className="lg:text-2xl">(04)</pre>
            </div>

            {project.gallery && (
              <div className="flex justify-around gap-5 flex-wrap">
                {/* Desktop + mobile preview row */}
                <div className="gallery-item flex w-full gap-10 sm:gap-0 flex-col sm:flex-row justify-between m-2">
                  <Image
                    src={project.desktopImg}
                    width={900}
                    height={500}
                    alt="Desktop preview"
                    className="sm:w-[77%] sm:h-full object-cover rounded-xl sm:rounded-2xl"
                  />
                  <Image
                    src="/bedir/mobile.png"
                    width={900}
                    height={500}
                    alt="Mobile preview"
                    className="sm:w-[20%] object-cover rounded-xl sm:rounded-2xl"
                  />
                </div>

                {/* Gallery grid */}
                <div className="flex flex-wrap gap-y-5">
                  {project.gallery.map((image, index) => (
                    <div key={index} className="gallery-item flex sm:w-1/2 flex-col p-2 text-lg">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={900}
                        height={500}
                        className="h-full object-cover rounded-xl"
                      />
                      <h2>{image.alt}</h2>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </main>

        <Footer />
      </main>
    </>
  );
};