'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/all';
import TopInfo from './components/TopInfo';
import useMouse from '@/util/useMouse';
import styles from './page.module.scss';
import { ArrowDownRight, Eye } from 'lucide-react';
import { SiAffinitydesigner, SiUphold } from 'react-icons/si';

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
    <header className="bg-primary h-[80svh] overflow-hidden sticky top-0 flex flex-col justify-center items-center">
      <TopInfo />
      {isMobile && (
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="hold-down-icon absolute  select-none z-10 flex  justify-center items-center font-bold text-primary rounded-full w-[50px] h-[50px] bg-hint"
          style={{ left: 'calc(50% - 25px)', top: 'calc(80% - 2px)' }}
        >
          <Eye className='select-none'/>
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
            className="w-fit flex  flex-col gap-3"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className=" pl-3 md:pl-1.5 flex flex-col items-start gap-3">
              <h1 className=" select-none font-bold text-[4rem]/[4rem]  sm:text-[5rem]/[5rem] md:text-[6rem]/[6rem] uppercase">
                They call <br className='visible lg:hidden'/>  me <span className="text-primary">Maliik</span>,
              </h1>
              <h2 className=" capitalize  select-none font-bold text-sm md:text-2xl w-fit self-start text-secondary border border-secondary px-1">
                <span className=" select-none text-primary">Creative</span> front-end developer / designer
              </h2>
              <p className='text-[1rem]/[1.5] sm:text-3xl font-black '>If you were looking for a way to break free <br />from the generic templates, look no more </p>
            </div>
          </span>
        </motion.div>
        <div className={styles.body}>
          <div id="heroCon">
            <span>
              <div className="flex flex-col   ">
                <div className="w-fit flex flex-col gap-3 items-start">
                  <div className="overflow-hidden">
                    <h1
                      ref={heroRef}
                      className="words  select-none text-[4rem]/[4rem]  sm:text-[5rem]/[5rem] md:text-[6rem]/[6rem] uppercase font-bold w-fit mt-0 mx-auto"
                    >
                      <span className="text-hint">I'm</span> Ahmed <br className='visible lg:hidden'/> Haitham, <br />
                      
                    </h1>
                   
                  </div>
                  <h2 className="capitalize  select-none font-bold text-sm md:text-2xl w-fit self-start bg-secondary text-primary border border-secondary px-1">
                    <span>Freelance</span> front-end developer / designer
                  </h2>
                  <p className='text-[1rem]/[1.5] sm:text-3xl font-black '>I give growing brands and startups the <br /> premium tailored websites they deserve </p>
                </div>
              </div>
            </span>
          </div>
        </div>
      </motion.main>
    </header>
  );
}