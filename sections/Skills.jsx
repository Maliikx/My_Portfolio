"use client";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import {
  SiReact,
  SiNextdotjs,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiJavascript,
  SiFigma,
  SiFlutter,
  SiDart,
  SiSwift,
  SiNodedotjs,
} from "react-icons/si";

const iconsStyle =
  "icon size-10 sm:size-15 md:size-20 lg:size-38  hover:scale-110  hover:text-hint transition-all duration-150 ease-in";
const iconsSize = 150;

const Skills = ({ skillEnter_active, skillLeave_active }) => {
  const iconsRef = useRef(null);
  const skillRef = useRef(null);
  const icons = useRef([]);

  useLayoutEffect(() => {
    const SkillSplit = new SplitText(skillRef.current, { type: "chars" });

    // gsap.from(icons, {
    //   scrollTrigger:{
    //     trigger: icons,
    //     scrub: true,
    //     start: " 80% top ",
    //     end: " 50% top",
    //     markers: true,

    //   },
    //   opacity: 0.2,
    //   scale: 0.5,
    //   y: 30,
    //   stagger: 0.09, // stagger each element by 0.2 seconds
    //   // duration: 0.3,
    //   // ease: "power2.out",
    // })

    // icons.current.forEach(icon =>{
    gsap.fromTo(
      ".icon",
      {
        opacity: 0.2,
        y: 30,
        stagger: 0.09, // stagger each element by 0.2 seconds
        // duration: 0.3,
        // ease: "power2.out",
      },
      {
        scrollTrigger: {
          trigger: ".icon",
          scrub: true,
          start: " 80% top ",
          end: " 50% top",
          // markers: true,
        },
        opacity: 1,
        y: 0,
        stagger: 0.09,
        ease: "power1.in",
      }
    );
    // })

    gsap.from(SkillSplit.chars, {
      scrollTrigger: {
        trigger: SkillSplit.chars,
        scrub: true,
        start: " 80% top ",
        end: " 50% top",
        // markers: "true",
      },
      opacity: 0.2,
      y: 10,
      x: -10,
      scale: 0.9,
      stagger: 0.08,
    });
  }, []);

  return (
    //   third section

    <div id="Skills" className="  flex flex-col w-[90%] self-center gap-20">
      <hr className="border-primary " />
      <h1
        ref={skillRef}
        className={"text-5xl md:text-8xl font-bold  border-primary w-fit  h-fit  px-1  "}
      >
        SKILLS
      </h1>
      <div ref={iconsRef} className="flex flex-wrap gap-24 justify-center md:justify-start ">
        {/* <NextSvg /> */}
        <SiNextdotjs
          className={` ${iconsStyle}`}
          onMouseEnter={() =>
            skillEnter_active(
              "Next.js",
              "powers my React apps with SSR, routing, and API routes."
            )
          }
          onMouseLeave={skillLeave_active}
        />

        <SiReact
          className={iconsStyle}
          onMouseEnter={() =>
            skillEnter_active(
              "React.js",
              "Builds modular, dynamic interfaces that are fast and scalable."
            )
          }
          onMouseLeave={skillLeave_active}
        />

        <SiTailwindcss
          onMouseEnter={() =>
            skillEnter_active(
              "Tailwindcss",
              "Speeds up styling without sacrificing clarity."
            )
          }
          onMouseLeave={skillLeave_active}
          className={iconsStyle}
        />

        <SiJavascript
          className={iconsStyle}
          onMouseEnter={() =>
            skillEnter_active(
              "Javascript",
              "The language of logic and interactivity."
            )
          }
          onMouseLeave={skillLeave_active}
        />

        <SiHtml5
          className={iconsStyle}
          onMouseEnter={() =>
            skillEnter_active(
              "HTML",
              "I make sure my markup is clean, semantic, and accessible"
            )
          }
          onMouseLeave={skillLeave_active}
        />

        <SiCss3
          className={iconsStyle}
          onMouseEnter={() =>
            skillEnter_active(
              "CSS",
              "Styling isn’t just about looks — it’s about user experience"
            )
          }
          onMouseLeave={skillLeave_active}
        />

        <SiFlutter
          onMouseEnter={() =>
            skillEnter_active(
              "Flutter",
              "One codebase, endless possibilities — fast apps that feel truly native."
            )
          }
          onMouseLeave={skillLeave_active}
          className={iconsStyle}
        />

        <SiDart
          onMouseEnter={() =>
            skillEnter_active(
              "Dart",
              "Clean, structured, and built for beautiful UIs"
            )
          }
          onMouseLeave={skillLeave_active}
          className={iconsStyle}
        />

        {/* <SiSwift
          onMouseEnter={() => skillEnter_active("Swift", "My favorite")}
          onMouseLeave={skillLeave_active}
          className={iconsStyle}
        /> */}

        <SiFigma
          onMouseEnter={() =>
            skillEnter_active(
              "Figma",
              "fast, flexible, and made for seamless design handoffs."
            )
          }
          onMouseLeave={skillLeave_active}
          className={iconsStyle}
        />
      </div>
      <div className="flex flex-col gap-20">
        <h2 className="text-lg md:text-3xl uppercase font-bold">Currently Learning:-</h2>
        <div className=" flex flex-row justify-center md:justify-start gap-20">
          <SiSwift
            onMouseEnter={() => skillEnter_active("Swift", "Soon...")}
            onMouseLeave={skillLeave_active}
            className={iconsStyle}
            />
          <SiNodedotjs
            onMouseEnter={() => skillEnter_active("Node.js", "Soon...")}
            onMouseLeave={skillLeave_active}
            className={iconsStyle}
            />
        </div>
      </div>
    </div>
  );
};

export default Skills;
