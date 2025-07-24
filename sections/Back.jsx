"use client";
import React, { useLayoutEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
// import { Dot } from "lucide-react";

const Back = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]); // Text fades when scrolled halfway
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0]); // Text fades when scrolled halfway

  useLayoutEffect(() => {
    const handler = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handler);
    return () => {
      window.removeEventListener("mousemove", handler);
    };
  });

  return (
    <div>
      {/* <motion.div
        style={{ opacity, scale }}
        className="w-60 aspect-square rounded-full bg-accent fixed z-0 blur-3xl  right-[0%] top-[15%] "
      ></motion.div>
      <motion.div
        style={{ opacity, scale }}
        className="w-96 aspect-square rounded-full bg-accent fixed z-0 blur-3xl left-[-15%] top-[0%]"
      ></motion.div>
      <motion.div
        style={{ opacity, scale }}
        className="w-96 aspect-[1/5] rounded-full bg-accent fixed z-0 blur-3xl right-[10%] top-[70%]"
      ></motion.div> */}
      {/* <div className=" absolute flex flex-wrap w-full gap-24 h-full top-4 mx-auto p-12">
        {Array.from({ length: 100 }, (_, i) => (
          <Dot key={i} mousePos={mousePos}></Dot>
        ))}
      </div> */}
      <motion.div
        style={{ opacity, scale }}
        className=" aspect-square w-20 bg-secondary absolute right-60 top-60"
      ></motion.div>
      <motion.div
        style={{ opacity, scale }}
        className=" aspect-square w-20 bg-[#d24811] absolute right-10 top-60"
      ></motion.div>
      <motion.div
        style={{ opacity, scale }}
        className=" aspect-square w-20 bg-secondary absolute  right-10 top-96"
      ></motion.div>
    </div>
  );
};

export default Back;
