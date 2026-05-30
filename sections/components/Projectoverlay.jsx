"use client";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ArrowUpRight } from "lucide-react";

// ─── Animation variants ───────────────────────────────────────────────────────

const backdropVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
  exit:    { opacity: 0, transition: { duration: 0.25, ease: "easeIn" } },
};

const panelVariants = {
  hidden:  { y: "100%" },
  visible: { y: "0%",  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit:    { y: "100%", transition: { duration: 0.35, ease: [0.7, 0, 0.84, 0] } },
};

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

// ─── Info block ───────────────────────────────────────────────────────────────

const InfoBlock = ({ number, label, content }) => (
  <motion.div variants={fadeUp} className="flex flex-col gap-3 border-t border-primary/20 pt-5">
    <div className="flex items-baseline gap-2">
      <pre className="text-sm opacity-40">{number}</pre>
      <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight">
        {label}
      </h2>
    </div>
    <p className="opacity-60 text-base sm:text-lg md:text-xl leading-relaxed max-w-prose">
      {content}
    </p>
  </motion.div>
);

// ─── Inner content (only rendered when open) ─────────────────────────────────
// Kept separate so hooks (useEffect) only run while the overlay is mounted.

const OverlayContent = ({ work, onClose }) => {
  const scrollRef = useRef(null);

  // Lock page scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
      />

      {/* Sheet */}
      <motion.div
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed bottom-0 left-0 right-0 z-[70] h-[92svh] sm:h-[88svh] flex flex-col rounded-t-3xl overflow-hidden shadow-2xl"
        style={{ backgroundColor: "var(--color-secondary, #e7e2dd)", color: "var(--color-primary, #1a1a1a)" }}
      >

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-5 sm:px-8 md:px-12 py-4 sm:py-5 border-b shrink-0"
          style={{ borderColor: "var(--color-primary, #1a1a1a)" }}>

          <div className="flex items-center gap-3 min-w-0">
            <h1 className="font-bold uppercase text-xl sm:text-2xl md:text-3xl truncate">
              {work.title}
            </h1>
            <span className="hidden sm:inline-block font-bold text-sm rounded-full py-1 px-3 shrink-0"
              style={{ backgroundColor: "var(--color-primary, #1a1a1a)", color: "var(--color-secondary, #e7e2dd)" }}>
              {work.job}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Visit site */}
            {work.link && (
              <a
                href={work.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-bold text-sm sm:text-base rounded-full py-2 px-4 transition-opacity hover:opacity-70"
                style={{ backgroundColor: "var(--color-primary, #1a1a1a)", color: "var(--color-secondary, #e7e2dd)" }}
              >
                <span className="hidden xs:inline">Visit Site</span>
                <ArrowUpRight size={16} />
              </a>
            )}

            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="p-2 rounded-full border transition-all duration-200"
              style={{ borderColor: "var(--color-primary, #1a1a1a)" }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = "var(--color-primary, #1a1a1a)";
                e.currentTarget.style.color = "var(--color-secondary, #e7e2dd)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--color-primary, #1a1a1a)";
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ── Scrollable body ──────────────────────────────────────────────── */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto overscroll-contain px-5 sm:px-8 md:px-12 py-6 sm:py-8"
        >
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-8 sm:gap-10 max-w-4xl"
          >
            {/* Date + mobile job tag */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 flex-wrap">
              <span className="sm:hidden font-bold text-sm rounded-full py-1 px-3"
                style={{ backgroundColor: "var(--color-primary, #1a1a1a)", color: "var(--color-secondary, #e7e2dd)" }}>
                {work.job}
              </span>
              <span className="font-bold text-lg opacity-50">{work.date}</span>
            </motion.div>

            {/* Mission / Challenge / Results */}
            <InfoBlock number="(01)" label="Mission"   content={work.mission}   />
            <InfoBlock number="(02)" label="Challenge" content={work.challenge} />
            <InfoBlock number="(03)" label="Results"   content={work.results}   />

            {/* Gallery */}
            {work.gallery?.length > 0 && (
              <motion.div variants={fadeUp} className="flex flex-col gap-5 border-t pt-5"
                style={{ borderColor: "var(--color-primary, #1a1a1a)" }}>
                <div className="flex items-baseline gap-2">
                  <pre className="text-sm opacity-40">(04)</pre>
                  <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight">
                    Gallery
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pb-10">
                  {work.gallery.map((img, i) => (
                    <div key={i} className="flex flex-col gap-2">
                      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl">
                        <Image
                          src={img.src}
                          alt={img.alt ?? ""}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 90vw, 45vw"
                        />
                      </div>
                      {img.alt && <p className="text-sm opacity-50">{img.alt}</p>}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

// ─── Public export — AnimatePresence lives HERE, outside the conditional ──────
// This is the critical fix: AnimatePresence must always be rendered (not
// conditionally mounted), and the animated children go inside it.
// The parent passes `isOpen` and only renders children when true.

export const ProjectOverlay = ({ work, onClose }) => (
  <AnimatePresence mode="wait">
    {work && <OverlayContent key={work.slug ?? work.title} work={work} onClose={onClose} />}
  </AnimatePresence>
);