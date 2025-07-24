'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/all';
import TopInfo from './components/TopInfo';
import useMouse from '@/util/useMouse';
import styles from './page.module.scss';
import { ArrowDownRight } from 'lucide-react';

gsap.registerPlugin(SplitText);

export default function Header() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const { x, y } = useMouse();
  const [size, setSize] = useState(40);
  const heroRef = useRef(null);
  const maskRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.088], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768; // Tailwind's md breakpoint
      setIsMobile(mobile);
      console.log('Screen resized, isMobile:', mobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update mask size based on hover and hold states
  useEffect(() => {
    if (!isMobile) {
      setSize(isHovered ? 400 : 40);
    } else if (isHolding) {
      setSize(1000);
    } else {
      setSize(40);
    }
    console.log('Mask size:', size, 'isMobile:', isMobile, 'isHolding:', isHolding);
  }, [isHovered, isMobile, isHolding]);

  // GSAP text animation
  useEffect(() => {
    const heroSplit = new SplitText(heroRef.current, { type: 'words, chars', mask: 'words' });
    gsap.from(heroSplit.chars, {
      y: '100%',
      stagger: 0.05,
      duration: 0.5,
      delay: 0.8,
      ease: 'power2.out',
    });
    return () => {
      heroSplit.revert();
    };
  }, []);

  const handleTouchStart = () => setIsHolding(true);
  const handleTouchEnd = () => setIsHolding(false);

  return (
    <header className="bg-primary h-[80vh] overflow-hidden sticky top-0 flex flex-col justify-center items-center">
      <TopInfo />
      {isMobile && (
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="absolute z-10 flex select-auto justify-center items-center font-bold text-primary rounded-full w-[50px] h-[50px] bg-hint"
          style={{ left: 'calc(50% - 25px)', top: 'calc(80% - 2px)' }}
        >
          HOLD
        </div>
      )}
      <motion.main style={{ opacity, scale }} className={styles.main}>
        <div className="absolute hidden md:flex left-10 top-1/4 z-10 text-sm sm:text-md items-center">
          <h1 onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            // HOVER
          </h1>
          <ArrowDownRight />
        </div>
        <motion.div
          ref={maskRef}
          className={styles.mask}
          animate={
            isMobile
              ? {
                  WebkitMaskPosition: '50% 85%',
                  WebkitMaskSize: `${size}px`,
                }
              : {
                  WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
                  WebkitMaskSize: `${size}px`,
                }
          }
          transition={{ type: 'tween', ease: 'backOut', duration: 0.5 }}
        >
          <span
            className="w-fit flex justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="pl-2 flex flex-col items-center">
              <h1 className=" font-bold text-[4rem] sm:text-[5rem] md:text-[7rem] uppercase">
                They call <br /> me <span className="text-primary">Malek</span>
              </h1>
              <h1 className=" capitalize font-bold text-sm md:text-2xl w-fit self-start text-secondary border border-secondary px-1">
                <span className="text-primary">Creative</span> front-end developer / designer
              </h1>
            </div>
          </span>
        </motion.div>
        <div className={styles.body}>
          <div id="heroCon">
            <span>
              <div className="flex flex-col items-center">
                <div className="w-fit">
                  <div className="overflow-hidden">
                    <h1
                      ref={heroRef}
                      className="words text-[4rem] sm:text-[5rem] md:text-[7rem] uppercase font-bold w-fit mt-0 mx-auto"
                    >
                      <span className="text-hint">I'm</span> Ahmed <br /> Haytham
                    </h1>
                  </div>
                  <h2 className="capitalize font-bold text-sm md:text-2xl w-fit self-start bg-secondary text-primary border border-secondary px-1">
                    <span>Freelance</span> front-end developer / designer
                  </h2>
                </div>
              </div>
            </span>
          </div>
        </div>
      </motion.main>
    </header>
  );
}