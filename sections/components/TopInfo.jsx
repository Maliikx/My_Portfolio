"use client";
import React from "react";

import { useEffect, useState } from "react";
import Fliplink from "./Fliplink";

const wrapperStyle = "flex flex-col  px-3";
const  labelsStyle = " font-semibold uppercase sm:text-lg";
const  contentStyle = " uppercase";



const TopInfo = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const gmtPlus2 = new Date(utc + 3 * 3600000);

      const timeString = gmtPlus2.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true, // enables AM/PM format
      });

      setTime(timeString);
    };

    const interval = setInterval(updateClock, 1000);
    updateClock(); // Set immediately

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-secondary flex flex-col gap-2 absolute z-10 top-3 w-full  items-center ">
      <div className="flex flex-wrap justify-between w-[80%]">
        
        {/* <div className={wrapperStyle}>
          <h1 className={labelsStyle}>Status</h1>

          <div className="flex items-center gap-1 ">
            <div className={`w-2 h-2 bg-green-500 border border-black rounded-full `}></div>
            <h1 className={contentStyle}>Available</h1>
          </div>
        </div> */}

        {/* <div className={wrapperStyle}>
          <h1 className={labelsStyle}>Time</h1>
          <h1 className={contentStyle}>{time}</h1>
        </div> */}

        <div className={wrapperStyle}>
          <h1 className={labelsStyle}>Based in</h1>
          <h1 className={contentStyle}>Egypt</h1>
        </div>

        <div className={`bg-hint rounded-md text-primary justify-center font-bold ${wrapperStyle}`}>
          {/* <h1 className={labelsStyle}>Resume</h1> */}
          <Fliplink href='#Contact' className={contentStyle}>Contact</Fliplink>
        </div>

        {/* <button className=' font-black border-2 border-hint  bg-hint px-3 rounded-lg text-primary cursor-pointer hover:bg-transparent hover:text-secondary  '>Contact</button> */}
      </div>

      <hr className="  border-secondary w-[90%] " />
    </div>
  );
};

export default TopInfo;
