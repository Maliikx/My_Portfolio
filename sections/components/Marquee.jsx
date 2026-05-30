"use client";
import React, { useRef } from "react";
import gsap from "gsap";

import { useGSAP } from '@gsap/react';

export default function Marquee({ text, speed = 20, reverse = false }) {
  const movingContainer = useRef();

  useGSAP(
    () => {
      const setupMarquee = () => {
        const width = movingContainer.current.offsetWidth / 2;

        gsap.to(movingContainer.current, {
          x: reverse ? width : -width,
          duration: speed,
          ease: "none",
          repeat: -1,
        });
      };

      setupMarquee();
    },
    { scope: movingContainer }
  );

  return (
    <div className="relative bg-hint -z-1 whitespace-nowrap  flex">
      <div ref={movingContainer} className="flex min-w-full">
        {/* We duplicate the text to ensure there is no gap in the loop */}
        {[...Array(10)].map((_, i) => (
          <span
            key={i}
            className="text-9xl leading-6 font-bold uppercase text-secondary px-4"
          >
            {text} 
            <span className="mx-10 text-outline"></span>
          </span>
        ))}
      </div>
    </div>
  );
}
