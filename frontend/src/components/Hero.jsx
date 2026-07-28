import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShinyButton } from "./ui/ShinyButton";

export default function Hero({ onExploreClick }) {
  const containerRef = useRef(null);

  // Scroll parallax effects
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 500], [0, 100]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);
  const scaleImg = useTransform(scrollY, [0, 800], [1.02, 1.12]);

  const titleWords = "Wear Your Story".split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const wordVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15
      }
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative h-[85vh] w-full overflow-hidden bg-bg-dark px-4 sm:px-6 lg:px-8"
    >
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y: yBg, scale: scaleImg }}
        className="absolute inset-0 z-0 h-full w-full"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/40 to-transparent z-10" />
        <img
          src="/hero-image.png"
          alt="THUKIL high-fashion collection showcase"
          className="h-full w-full object-cover object-center"
        />
      </motion.div>

      {/* Hero Content Overlay */}
      <div className="relative z-20 mx-auto flex h-full max-w-7xl flex-col justify-end pb-12 sm:pb-20 lg:pb-24">
        <motion.div
          style={{ opacity: opacityText }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl text-text-primary"
        >
          {/* Accent Badge */}
          <motion.div
            variants={wordVariants}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-bg-secondary/10 backdrop-blur-sm px-4 py-1.5"
          >
            <span className="font-accent text-xl leading-none text-[var(--color-primary)] font-bold">
              THUKIL
            </span>
            <span className="text-[10px] uppercase tracking-widest text-text-primary/90">
              - Rooted In Tamil
            </span>
          </motion.div>

          {/* Staggered Heading */}
          <h1 className="font-display text-4xl font-light leading-none tracking-tight sm:text-6xl lg:text-7xl mb-6">
            {titleWords.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden pb-2 mr-3 last:mr-0">
                <motion.span
                  variants={wordVariants}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            variants={wordVariants}
            className="mb-8 max-w-lg text-sm sm:text-base text-text-secondary font-light tracking-wide leading-relaxed"
          >
            Premium streetwear that blends Tamil heritage with modern design. Made for everyday, crafted to last.
          </motion.p>

          <motion.div variants={wordVariants}>
            <ShinyButton onClick={onExploreClick}>
              Explore Collection &rarr;
            </ShinyButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ delay: 2, repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5"
      >
        <span className="text-[9px] uppercase tracking-widest text-text-secondary font-semibold">Scroll</span>
        <div className="h-6 w-[1px] bg-border" />
      </motion.div>
    </section>
  );
}
