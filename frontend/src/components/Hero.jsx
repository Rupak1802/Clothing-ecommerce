import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero({ onExploreClick }) {
  const containerRef = useRef(null);

  // Scroll parallax effects
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 500], [0, 100]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);
  const scaleImg = useTransform(scrollY, [0, 800], [1.02, 1.12]);

  const titleWords = "The Art of Effortless Form".split(" ");

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
      className="relative h-[85vh] w-full overflow-hidden bg-[#e9e4da] px-4 sm:px-6 lg:px-8"
    >
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y: yBg, scale: scaleImg }}
        className="absolute inset-0 z-0 h-full w-full"
      >
        <div className="absolute inset-0 bg-black/15 z-10" />
        <img
          src="/background.png"
          alt="AURA high-fashion collection showcase"
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
          className="max-w-2xl text-white"
        >
          {/* Accent Badge */}
          <motion.div
            variants={wordVariants}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-1.5"
          >
            <span className="font-accent text-xl leading-none text-[#ff2a74] font-bold">
              New Drop
            </span>
            <span className="text-[10px] uppercase tracking-widest text-white/90">
              - Editorial Vol. II
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
            className="mb-8 max-w-lg text-sm sm:text-base text-white/80 font-light tracking-wide leading-relaxed"
          >
            Sculptural silhouettes, sustainable textiles, and fluid tailored forms designed for the conscious modern minimal life.
          </motion.p>

          <motion.div variants={wordVariants}>
            <motion.button
              onClick={onExploreClick}
              whileHover={{ 
                scale: 1.03,
                borderRadius: "24px",
                backgroundColor: "#ff2a74",
                borderColor: "#ff2a74"
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group flex items-center justify-center gap-3 border-2 border-white bg-transparent px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-white transition-colors duration-200 cursor-pointer"
            >
              Explore Collection
              <motion.span
                className="inline-block"
                variants={{
                  hover: { x: 5 }
                }}
                whileHover="hover"
              >
                &rarr;
              </motion.span>
            </motion.button>
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
        <span className="text-[9px] uppercase tracking-widest text-white/60 font-semibold">Scroll</span>
        <div className="h-6 w-[1px] bg-white/40" />
      </motion.div>
    </section>
  );
}
