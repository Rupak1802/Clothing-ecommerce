import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DhrishtiBommai from "./DhrishtiBommai";

/* ─────────────────────────────────────────────────────────────────
   Hanging Brass Lamp — traditional temple hanging lamp SVG
───────────────────────────────────────────────────────────────── */
function HangingBrassLamp() {
  return (
    <svg width="60" height="240" viewBox="0 0 60 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Hanging Chain */}
      <line x1="30" y1="0" x2="30" y2="150" stroke="#E8A020" strokeWidth="2" strokeDasharray="1 3" />
      <circle cx="30" cy="50" r="4" stroke="#E8A020" strokeWidth="2" />
      <circle cx="30" cy="100" r="4" stroke="#E8A020" strokeWidth="2" />
      
      {/* Lamp hanger loop */}
      <path d="M30 150 C25 150, 20 155, 20 160 C20 165, 25 170, 30 170 C35 170, 40 165, 40 160 C40 155, 35 150, 30 150 Z" fill="#E8A020" fillOpacity="0.2" stroke="#E8A020" strokeWidth="2" />
      
      {/* Diya Bowl */}
      <path d="M15 170 H45 C45 170, 48 190, 30 195 C12 190, 15 170, 15 170 Z" fill="#E8A020" stroke="#C59B27" strokeWidth="2" />
      <path d="M22 170 H38 C38 170, 40 180, 30 183 C20 180, 22 170, 22 170 Z" fill="#C59B27" />
      
      {/* Warm Flame */}
      <path d="M30 170 C28 165, 26 155, 30 145 C34 155, 32 165, 30 170 Z" fill="url(#flameGrad)" />
      
      {/* Traditional Hanging Tassel/Bell below Diya */}
      <line x1="30" y1="195" x2="30" y2="215" stroke="#E8A020" strokeWidth="2" />
      <path d="M26 215 H34 L32 225 H28 L26 215 Z" fill="#E8A020" stroke="#C59B27" strokeWidth="1.5" />
      <circle cx="30" cy="230" r="3" fill="#E8A020" />
      
      <defs>
        <linearGradient id="flameGrad" x1="30" y1="145" x2="30" y2="170" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFD100" />
          <stop offset="50%" stopColor="#FF6B00" />
          <stop offset="100%" stopColor="#CC2200" stopOpacity="0.8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Category Options that expand from the Male Stamp
───────────────────────────────────────────────────────────────── */
const CATEGORY_OPTIONS = [
  { id: "oversized", label: "Oversized", sublabel: "வித்தியாசமான", variant: "yellow", dollColor: "#E8A020", badge: "01" },
  { id: "polos",     label: "Polo",      sublabel: "பாரம்பரிய",    variant: "green",  dollColor: "#2D6A2D", badge: "02" },
  { id: "regulars",  label: "Regular",   sublabel: "அன்றாட அழகு",  variant: "blue",   dollColor: "#006B8F", badge: "03" }
];

function CategoryOptionStamp({ opt, delay, onClick }) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -40, scale: 0.7 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -40, scale: 0.7 }}
      transition={{ delay, type: "spring", stiffness: 180, damping: 20 }}
      onClick={() => onClick(opt.id)}
      className="group flex items-center gap-4 cursor-pointer"
      aria-label={`Browse ${opt.label} collection`}
    >
      <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
        <DhrishtiBommai variant={opt.variant} color={opt.dollColor} size={58} />
      </div>
      <div
        className="relative flex items-center gap-3 px-5 py-3 rounded-lg transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
        style={{
          background: "#EFE5D8",
          border: "1.5px solid #E8A02060",
          boxShadow: "0 4px 15px rgba(232,160,32,0.1), 4px 4px 0 rgba(0,0,0,0.15)",
          minWidth: "180px"
        }}
      >
        {/* Mini corner brackets */}
        <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-[#E8A020]" />
        <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-[#E8A020]" />
        <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-[#E8A020]" />
        <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-[#E8A020]" />

        <div className="ml-2 text-left">
          <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#C1440E" }}>{opt.badge}</div>
          <div className="font-display font-black text-xl leading-none text-[#1C0A00]">{opt.label}</div>
          <div className="text-[11px] mt-0.5" style={{ fontFamily: "'Noto Serif Tamil', serif", color: "#6B1A1A" }}>{opt.sublabel}</div>
        </div>
        <div className="ml-auto text-lg font-bold transition-transform duration-300 group-hover:translate-x-1" style={{ color: "#C1440E" }}>→</div>
      </div>
    </motion.button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   The main Stamp — Male or Female
   Redesigned to remove pixelated mail postage dots and use luxury
   Kanchipuram gold filigree corner brackets & traditional SVGs
───────────────────────────────────────────────────────────────── */
function CategoryStamp({ type, isOpen, onClick }) {
  const isMale = type === "male";
  const accentColor = isMale ? "#006B8F" : "#CC2200";
  const bgColor = isMale ? "#081F26" : "#21080D"; // Premium deep silk tones
  const label = isMale ? "MEN" : "WOMEN";
  const tamilLabel = isMale ? "ஆண்" : "பெண்";

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03, rotate: isMale ? 1 : -1 }}
      whileTap={{ scale: 0.97 }}
      className="relative cursor-pointer group outline-none animate-float-stamp"
      style={{ width: "210px", filter: "drop-shadow(0 20px 45px rgba(28,10,0,0.18))" }}
      aria-label={`${label} category stamp`}
    >
      <div 
        className="relative rounded-xl overflow-hidden p-3 transition-colors duration-300" 
        style={{ 
          background: "#EFE5D8", 
          border: "2px solid #E8A02070",
          boxShadow: "0 4px 20px rgba(232,160,32,0.15)"
        }}
      >
        {/* Decorative corner brackets (South Indian temple style) */}
        <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[#E8A020]" />
        <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[#E8A020]" />
        <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[#E8A020]" />
        <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[#E8A020]" />

        {/* Inner card body */}
        <div
          className="relative overflow-hidden flex flex-col items-center justify-center py-10 px-6 gap-3 rounded-lg"
          style={{ 
            background: bgColor, 
            minHeight: "260px", 
            border: `1.5px solid ${isMale ? "rgba(0,107,143,0.3)" : "rgba(204,34,0,0.3)"}` 
          }}
        >
          {/* Subtle repeating pattern watermark */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/tamil-pookolam-bg.jpg')] bg-[size:100px] pointer-events-none" />
          
          <div className="absolute top-3 right-3 text-[8px] uppercase tracking-[0.25em] opacity-40 font-bold" style={{ color: "#FFF8F0" }}>THUKIL</div>
          
          {/* Authentic Zari Gold SVGs */}
          <div className="mb-2">
            {isMale ? (
              <svg width="64" height="64" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="18" fill="#E8A020" fillOpacity="0.2" stroke="#E8A020" strokeWidth="2.5" />
                <circle cx="50" cy="50" r="10" fill="#E8A020" />
                {[...Array(12)].map((_, i) => {
                  const angle = (i * 30 * Math.PI) / 180;
                  const x1 = 50 + 22 * Math.cos(angle);
                  const y1 = 50 + 22 * Math.sin(angle);
                  const x2 = 50 + 32 * Math.cos(angle);
                  const y2 = 50 + 32 * Math.sin(angle);
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#E8A020" strokeWidth="2.5" strokeLinecap="round" />;
                })}
                {[...Array(12)].map((_, i) => {
                  const angle = ((i * 30 + 15) * Math.PI) / 180;
                  const x1 = 50 + 22 * Math.cos(angle);
                  const y1 = 50 + 22 * Math.sin(angle);
                  const x2 = 50 + 27 * Math.cos(angle);
                  const y2 = 50 + 27 * Math.sin(angle);
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#E8A020" strokeWidth="1.5" strokeLinecap="round" />;
                })}
              </svg>
            ) : (
              <svg width="64" height="64" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 20 C42 40, 20 45, 20 60 C20 75, 40 85, 50 85 C60 85, 80 75, 80 60 C80 45, 58 40, 50 20 Z" fill="#E8A020" fillOpacity="0.15" stroke="#E8A020" strokeWidth="2.5" strokeLinejoin="round" />
                <path d="M50 35 C45 48, 30 52, 30 65 C30 75, 42 80, 50 80 C58 80, 70 75, 70 65 C70 52, 55 48, 50 35 Z" fill="#E8A020" fillOpacity="0.25" stroke="#E8A020" strokeWidth="2" strokeLinejoin="round" />
                <path d="M50 50 C48 58, 40 60, 40 70 C40 76, 46 78, 50 78 C54 78, 60 76, 60 70 C60 60, 52 58, 50 50 Z" fill="#E8A020" stroke="#E8A020" strokeWidth="1.5" />
                <path d="M25 65 C22 72, 35 82, 50 82" stroke="#E8A020" strokeWidth="2" strokeLinecap="round" />
                <path d="M75 65 C78 72, 65 82, 50 82" stroke="#E8A020" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </div>
          
          <div className="font-display font-black text-3.5xl tracking-[0.15em] uppercase" style={{ color: "#FFF8F0" }}>{label}</div>
          <div className="text-lg font-tamil" style={{ color: "#E8A020" }}>{tamilLabel}</div>
          
          <div className="w-full border-t mt-2 pt-2 text-[10px] uppercase tracking-widest text-center font-bold" style={{ borderColor: "rgba(232,160,32,0.15)", color: "#E8A020" }}>
            Tap to Explore →
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm"
            style={{ color: "#E8A020" }}
          >▶</motion.div>
        </div>
      </div>
    </motion.button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Product Stamp Card — for Section 4
   Redesigned to match the luxury Kanchipuram Gold corner-bracket card design
───────────────────────────────────────────────────────────────── */
function ProductStampCard({ img, label, tamilLabel, collectionId, delay, navigate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotate: -3 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay, type: "spring", stiffness: 80, damping: 18 }}
      whileHover={{ scale: 1.04, rotate: 2, zIndex: 10 }}
      onClick={() => navigate(`/?collection=${collectionId}`)}
      className="cursor-pointer group"
      style={{ filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.15))" }}
    >
      <div 
        className="relative rounded-xl overflow-hidden p-3" 
        style={{ 
          background: "#EFE5D8", 
          border: "2px solid #E8A02070",
          boxShadow: "0 4px 20px rgba(232,160,32,0.12)"
        }}
      >
        {/* Decorative corner brackets */}
        <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[#E8A020]" />
        <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[#E8A020]" />
        <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[#E8A020]" />
        <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[#E8A020]" />

        <div className="overflow-hidden rounded-lg">
          <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
            <img
              src={img}
              alt={label}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute top-2 right-2 opacity-50">
              <img src="/LOGO 5.png" alt="THUKIL" className="w-8 h-auto mix-blend-multiply" style={{ filter: "invert(1)" }} />
            </div>
          </div>
          <div className="px-3 py-3 text-center border-t border-border/10" style={{ background: "#EFE5D8" }}>
            <div className="font-display font-black text-xl uppercase tracking-wide text-[#1C0A00]">{label}</div>
            <div className="text-sm mt-0.5" style={{ fontFamily: "'Noto Serif Tamil', serif", color: "#C1440E" }}>{tamilLabel}</div>
            <div className="mt-2 text-[10px] uppercase tracking-widest font-bold opacity-60 text-[#1C0A00]">Shop Now →</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT — ThukLandingHero
═══════════════════════════════════════════════════════════════ */
export default function ThukLandingHero({ onExploreClick }) {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [maleStampOpen, setMaleStampOpen] = useState(false);
  const [femaleStampOpen, setFemaleStampOpen] = useState(false);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroBgY = useTransform(scrollY, [0, 600], [0, 80]);
  const heroTextY = useTransform(scrollY, [0, 400], [0, -60]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 1.08]);
  const tamilOpacity = useTransform(scrollY, [800, 1400], [0, 1]);
  const tamilY = useTransform(scrollY, [800, 1400], [60, 0]);

  const handleCategoryClick = (collectionId) => {
    setMaleStampOpen(false);
    setFemaleStampOpen(false);
    navigate(`/?collection=${collectionId}`);
    setTimeout(() => {
      document.getElementById("product-grid")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };



  return (
    <div ref={containerRef} className="w-full overflow-hidden">

      {/* ══════════════════════════════════════════════════════
          SECTION 1 — Hero Banner with Rangoli Background
      ══════════════════════════════════════════════════════ */}
      <section className="relative h-screen w-full overflow-hidden" style={{ background: "#EFE5D8" }}>
        <motion.div style={{ y: heroBgY, scale: heroScale }} className="absolute inset-0 z-0">
          <img
            src="/kolam-banner.jpg"
            alt="Traditional Tamil kolam rangoli design"
            className="absolute inset-0 w-full h-full object-cover object-top opacity-[0.25] mix-blend-multiply"
          />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(239,229,216,0.2) 0%, rgba(239,229,216,0.7) 50%, rgba(239,229,216,0.95) 100%)" }} />
        </motion.div>

        {/* Corner ornaments */}
        {[
          { pos: "top-8 left-8", dir: "normal",  color: "#E8A020", size: "text-6xl" },
          { pos: "top-8 right-8", dir: "reverse", color: "#E8A020", size: "text-6xl" },
          { pos: "bottom-20 left-12", dir: "normal",  color: "#CC2200", size: "text-5xl" },
          { pos: "bottom-20 right-12", dir: "reverse", color: "#CC2200", size: "text-5xl" }
        ].map((o, i) => (
          <div key={i} className={`absolute ${o.pos} ${o.size} opacity-20 animate-kolam-spin`}
            style={{ color: o.color, animationDirection: o.dir }}>✿</div>
        ))}

        {/* Hero text */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroTextY }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-6 inline-flex items-center gap-3 px-5 py-2 rounded-full"
            style={{ background: "rgba(28,10,0,0.04)", border: "1px solid rgba(232,160,32,0.6)", backdropFilter: "blur(12px)" }}
          >
            <span className="text-[10px] uppercase tracking-[0.4em] font-semibold" style={{ color: "#C1440E" }}>Tamil Heritage Brand</span>
            <span style={{ color: "#E8A020", opacity: 0.5 }}>·</span>
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold" style={{ color: "#1C0A00", opacity: 0.7 }}>Est. 2026</span>
          </motion.div>

          {/* Brand name */}
          <motion.h1
            initial={{ opacity: 0, y: 50, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0.25em" }}
            transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black uppercase"
            style={{
              fontSize: "clamp(72px, 15vw, 180px)", lineHeight: 1, letterSpacing: "0.25em",
              color: "#6B1A1A", textShadow: "0 0 80px rgba(232,160,32,0.15), 0 4px 12px rgba(28,10,0,0.08)"
            }}
          >THUKIL</motion.h1>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="my-6 flex items-center gap-4"
          >
            <div className="h-px w-24 sm:w-40" style={{ background: "linear-gradient(to right, transparent, #E8A020)" }} />
            <div className="text-2xl" style={{ color: "#E8A020" }}>✦</div>
            <div className="h-px w-24 sm:w-40" style={{ background: "linear-gradient(to left, transparent, #E8A020)" }} />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="max-w-xl text-base sm:text-lg font-light leading-relaxed"
            style={{ color: "rgba(28,10,0,0.75)", letterSpacing: "0.05em" }}
          >
            Woven from tradition. Worn with pride.<br />
            <span style={{ color: "#C1440E", fontWeight: "bold" }}>THUKIL</span> is Tamil heritage reborn in every thread.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-12 flex flex-col items-center gap-3"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] font-semibold" style={{ color: "rgba(28,10,0,0.5)" }}>Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-6 h-10 rounded-full border flex items-start justify-center pt-2"
              style={{ borderColor: "rgba(232,160,32,0.7)" }}
            >
              <div className="w-1.5 h-3 rounded-full" style={{ background: "#CC2200" }} />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2 — The Stamp Section (Male & Female)
      ══════════════════════════════════════════════════════ */}
      <section
        className="relative w-full overflow-hidden py-24 px-6 border-b border-[#E8A020]/20 bg-transparent"
      >
        {/* Swaying Temple Hanging Brass Lamps on left/right edges */}
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [-1.5, 1.5, -1.5] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute left-6 md:left-12 lg:left-24 top-0 z-0 opacity-80 hidden sm:block pointer-events-none"
        >
          <HangingBrassLamp />
        </motion.div>
        
        <motion.div
          animate={{ y: [-6, 6, -6], rotate: [1.5, -1.5, 1.5] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
          className="absolute right-6 md:right-12 lg:right-24 top-0 z-0 opacity-80 hidden sm:block pointer-events-none"
        >
          <HangingBrassLamp />
        </motion.div>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="text-[11px] uppercase tracking-[0.5em] font-bold mb-4" style={{ color: "#E8A020" }}>— Choose Your Path —</div>
          <h2 className="font-display font-black text-5xl sm:text-6xl uppercase tracking-wide" style={{ color: "#1C0A00" }}>Shop by Category</h2>
          <div className="mt-3 text-lg" style={{ fontFamily: "'Noto Serif Tamil', serif", color: "#CC2200" }}>உங்கள் பாணியை தேர்ந்தெடுங்கள்</div>
        </motion.div>

        {/* Stamps & Kolam Banner Image Asset */}
        <div className="flex flex-col items-center justify-center max-w-5xl mx-auto gap-12">
          {/* Stamp selector at the top */}
          <div className="flex flex-col items-center gap-6 z-10 w-full">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
              {/* Men's category stamp */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
              >
                <CategoryStamp 
                  type="male" 
                  isOpen={maleStampOpen} 
                  onClick={() => { 
                    setMaleStampOpen(p => !p); 
                    setFemaleStampOpen(false); 
                  }} 
                />
              </motion.div>

              {/* Women's category stamp */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}
              >
                <CategoryStamp 
                  type="female" 
                  isOpen={femaleStampOpen} 
                  onClick={() => { 
                    setFemaleStampOpen(p => !p); 
                    setMaleStampOpen(false); 
                  }} 
                />
              </motion.div>
            </div>

            {/* Expanded options */}
            <AnimatePresence>
              {(maleStampOpen || femaleStampOpen) && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-wrap justify-center gap-6 mt-2 mb-4"
                >
                  {CATEGORY_OPTIONS.map((opt, i) => (
                    <CategoryOptionStamp key={opt.id} opt={opt} delay={i * 0.08} onClick={handleCategoryClick} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {!maleStampOpen && !femaleStampOpen && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-xs font-semibold uppercase tracking-widest text-center mt-1 animate-pulse"
                  style={{ color: "#C1440E" }}
                >
                  ⚡ Click either stamp to choose your collection ⚡
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Sari border band */}
        <div className="absolute bottom-0 left-0 right-0 h-6 sari-border-divider" />
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — Tamil Language Transition
      ══════════════════════════════════════════════════════ */}
      <section
        className="relative w-full overflow-hidden flex flex-col items-center justify-center py-32 px-6 bg-transparent"
        style={{ minHeight: "70vh" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(232,160,32,0.06) 0%, transparent 75%)" }} />

        {/* Rotating Left Gold Mandala Backdrop */}
        <div className="absolute left-[-150px] md:left-[-220px] top-[10%] w-[350px] h-[350px] md:w-[500px] md:h-[500px] pointer-events-none opacity-[0.35] mix-blend-multiply select-none">
          <img 
            src="/images/tamil-mandala-gold.png" 
            alt=""
            className="w-full h-full object-contain animate-spin-slow" 
          />
        </div>

        {/* Rotating Right Gold Mandala Backdrop */}
        <div className="absolute right-[-150px] md:right-[-220px] top-[10%] w-[350px] h-[350px] md:w-[500px] md:h-[500px] pointer-events-none opacity-[0.35] mix-blend-multiply select-none">
          <img 
            src="/images/tamil-mandala-gold.png" 
            alt=""
            className="w-full h-full object-contain animate-spin-slow" 
          />
        </div>

        <motion.div style={{ opacity: tamilOpacity, y: tamilY }} className="relative z-10 text-center flex flex-col items-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-tamil text-sm sm:text-base font-bold tracking-[0.2em] select-none"
            style={{ color: "#CC2200" }}
          >
            தமிழ் • பாரம்பரியம் • புதுமை
          </motion.div>

          {/* Tamil brand name */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 80, damping: 14, delay: 0.3 }}
          >
            <h2
              className="font-tamil font-black select-none text-[#CC2200] tracking-wide"
              style={{
                fontSize: "clamp(55px, 12vw, 120px)",
                lineHeight: 1.1,
              }}
            >துகில்</h2>
          </motion.div>

          {/* Sari border divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.6, duration: 0.9 }}
            className="w-full max-w-2xl h-8 sari-border-divider"
          />

          {/* Meaning Tagline & Quote Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.7, duration: 0.8 }}
            className="text-center flex flex-col items-center gap-4 max-w-xl mx-auto px-8 py-6 rounded-3xl border border-[#E8A020]/20 shadow-lg bg-[#EFE5D8]/85 backdrop-blur-sm relative overflow-hidden"
          >
            {/* Corner gold accents */}
            <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-[#E8A020]/60" />
            <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-[#E8A020]/60" />
            <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-[#E8A020]/60" />
            <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-[#E8A020]/60" />

            <span className="font-tamil text-xl sm:text-2xl font-bold block tracking-wide leading-relaxed italic text-[#1C0A00]">
              “தலைமுறை கடந்து தொடரும் நெசவு, என்றும் அழியாத எமது அடையாளம்”
            </span>
            <span className="text-xs uppercase tracking-[0.25em] font-bold block mt-1 text-[#CC2200]">
              Woven across generations. Styled for the modern world.
            </span>
          </motion.div>

          {/* 3 Dhrishti Bommais: Rising from below one-by-one and settling into position (கலை | மரபு | நவீனம்) */}
          <div className="w-full max-w-xl mx-auto mt-8 overflow-visible">
            <div className="flex justify-center items-end gap-8 sm:gap-14 md:gap-16">
              {[
                {
                  tamil: "கலை",
                  variant: "yellow",
                  color: "#F7C325",
                  size: 46,
                  initialX: -20,
                  initialY: 70,
                  initialRotate: -10,
                  delay: 0.2
                },
                {
                  tamil: "மரபு",
                  variant: "maroon",
                  color: "#7F2424",
                  size: 58,
                  initialX: 0,
                  initialY: 90,
                  initialRotate: 0,
                  delay: 0.55
                },
                {
                  tamil: "நவீனம்",
                  variant: "blue",
                  color: "#1F597A",
                  size: 46,
                  initialX: 20,
                  initialY: 70,
                  initialRotate: 10,
                  delay: 0.9
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0,
                    x: item.initialX,
                    y: item.initialY,
                    scale: 0.4,
                    rotate: item.initialRotate
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotate: 0
                  }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    type: "spring",
                    stiffness: 95,
                    damping: 14,
                    mass: 0.85,
                    delay: item.delay
                  }}
                  className="group flex flex-col items-center cursor-pointer select-none"
                >
                  {/* Continuous gentle floating mascot after rising & settling */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 3 + i * 0.4,
                      ease: "easeInOut",
                      delay: 1.4 + item.delay
                    }}
                    whileHover={{ scale: 1.15, y: -10 }}
                    className="flex-shrink-0 drop-shadow-md transition-transform duration-300"
                  >
                    <DhrishtiBommai variant={item.variant} color={item.color} size={item.size} />
                  </motion.div>

                  {/* Clean Tamil Wording directly below (no card/box) */}
                  <motion.span
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: item.delay + 0.25, duration: 0.45 }}
                    className="font-tamil font-bold text-base sm:text-lg md:text-xl tracking-wider block mt-2 text-[#1C0A00] transition-all duration-300 group-hover:text-[#CC2200] group-hover:scale-105"
                    style={{ textShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
                  >
                    {item.tamil}
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 4 — Product Stamps on Funky Pattern
      ══════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden py-28 px-6 bg-transparent">
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="text-[11px] uppercase tracking-[0.5em] font-bold mb-4" style={{ color: "#E8A020" }}>— Curated —</div>
          <h2 className="font-display font-black text-5xl sm:text-6xl uppercase tracking-wide" style={{ color: "#1C0A00" }}>Explore The Collection</h2>
          <div className="mt-3 text-base" style={{ color: "#CC2200" }}>Handpicked styles for every celebration.</div>
        </motion.div>

        {/* Product stamp grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-16 max-w-4xl mx-auto">
          <ProductStampCard img="/images/generated/oversized_collection_1784910380005.png" label="Oversized" tamilLabel="அகலமான"  collectionId="oversized" delay={0}    navigate={navigate} />
          <ProductStampCard img="/images/generated/polos_collection_retry_1784910472013.png"      label="Polo"      tamilLabel="போலோ"     collectionId="polos"     delay={0.15}  navigate={navigate} />
          <ProductStampCard img="/images/tamil-model-silk.jpg"   label="Regular"   tamilLabel="வழக்கமான" collectionId="regulars"  delay={0.3}   navigate={navigate} />
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.5 }}
          className="text-center mt-20"
        >
          <button
            onClick={onExploreClick}
            id="explore-all-btn"
            className="group inline-flex items-center gap-3 px-10 py-4 font-bold uppercase tracking-widest text-sm transition-all duration-300 cursor-pointer"
            style={{ background: "transparent", border: "2px solid #E8A020", color: "#E8A020", borderRadius: "2px" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#E8A020"; e.currentTarget.style.color = "#1a0a00"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#E8A020"; }}
          >
            Explore All Products
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </motion.div>

        {/* Bottom sari border */}
        <div className="absolute bottom-0 left-0 right-0 h-6 sari-border-divider" />
      </section>
    </div>
  );
}
