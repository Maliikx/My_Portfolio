import { useState, useEffect } from "react";

const useMouseFooter = () => {
  const [mousePos, setMousePos] = useState({ x: null, y: null });

  const updateMousePos = e => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePos);

    return () => window.removeEventListener("mousemove", updateMousePos);
  }, []);

  return mousePos;
};

export default useMouseFooter;