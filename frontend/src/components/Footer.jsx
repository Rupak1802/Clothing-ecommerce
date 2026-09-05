import { motion } from "framer-motion";
import { Instagram, Heart, Facebook, Play } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────
   Tamil Heritage Line-Art Icons (Minimal Monochrome)
───────────────────────────────────────────────────────────────── */

// 🌾 Paddy Stalk (நெற்கதிர் — Prosperity & Natural Fabric)
function PaddyStalkIcon({ className = "w-6 h-6", size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 21C6 16 9.5 9 17.5 3" />
      <path d="M17.5 3C15 5 13 8 13.5 10.5C14.5 10.5 17 7.5 17.5 3Z" />
      <path d="M17.5 3C19.5 5 20 8 19 9.5C17.5 9.5 16 6.5 17.5 3Z" />
      <path d="M12 9C9.5 10.5 8.5 13 9.5 14.5C10.8 14.5 12.5 12 12 9Z" />
      <path d="M14 8C16.5 9.5 17.5 12 16.5 13.5C15.2 13.5 13.5 11 14 8Z" />
      <path d="M8.5 14C6.5 15.5 5.5 17.5 6.5 19C7.8 19 9.5 17 8.5 14Z" />
      <path d="M10.5 13.5C12.5 15 13 17 12 18.5C10.8 18.5 9.5 16 10.5 13.5Z" />
    </svg>
  );
}

// 🪷 Lotus Motif (தாமரை மலர் — Heritage & Purity)
function LotusIcon({ className = "w-6 h-6", size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {/* Central Petal */}
      <path d="M12 4C10.5 8 10 13 12 17C14 13 13.5 8 12 4Z" />
      {/* Left Inner Petal */}
      <path d="M12 9C9 9.5 6 12 6.5 15.5C8.5 17 11 17 12 17" />
      {/* Right Inner Petal */}
      <path d="M12 9C15 9.5 18 12 17.5 15.5C15.5 17 13 17 12 17" />
      {/* Left Outer Base Wing */}
      <path d="M6.5 15.5C4 16 2.5 17.5 3 19C5.5 19.5 9 18.5 12 18.5" />
      {/* Right Outer Base Wing */}
      <path d="M17.5 15.5C20 16 21.5 17.5 21 19C18.5 19.5 15 18.5 12 18.5" />
      {/* Bottom Lotus Base Line */}
      <path d="M8 20.5C10.5 21 13.5 21 16 20.5" />
    </svg>
  );
}

// 🪔 Kuthuvilakku Diya Lamp (குத்துவிளக்கு — Auspicious Light & Craft)
function KuthuvilakkuIcon({ className = "w-6 h-6", size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {/* Flame */}
      <path d="M12 2C11 3.5 10.5 4.8 12 6.5C13.5 4.8 13 3.5 12 2Z" fill="currentColor" fillOpacity="0.25" />
      {/* Top Cap */}
      <path d="M11 6.5H13" />
      {/* Diya Bowl */}
      <path d="M5.5 9C6.5 11 9 12 12 12C15 12 17.5 11 18.5 9" />
      <path d="M5.5 9H18.5" />
      {/* Diya Stem */}
      <line x1="12" y1="12" x2="12" y2="19" />
      <circle cx="12" cy="15" r="1.2" />
      {/* Pedestal Base */}
      <path d="M7.5 22C7.5 20 9.5 19 12 19C14.5 19 16.5 20 16.5 22" />
      <line x1="5" y1="22" x2="19" y2="22" />
    </svg>
  );
}

export default function Footer({ setActiveFilter }) {
  const socialIcons = [
    { icon: <Instagram size={15} />, href: "#", name: "Instagram" },
    { icon: <Heart size={15} />, href: "#", name: "Wishlist" },
    { icon: <Facebook size={15} />, href: "#", name: "Facebook" },
    { icon: <Play size={13} className="ml-0.5" fill="currentColor" />, href: "#", name: "YouTube" }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-bg-secondary border-t border-bg-secondary/20 pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ══════════════════════════════════════════════════════
            TOP: 4-Column Layout (Brand | Shop | Studio | Support)
        ══════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4 lg:gap-8 pb-10">
          
          {/* Brand Info */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setActiveFilter("all")}
              className="text-left hover:opacity-85 transition-opacity inline-block w-fit"
            >
              <img src="/LOGO 5.png" alt="THUKIL Logo" className="h-14 w-auto object-contain mix-blend-multiply" style={{ filter: "invert(1)" }} />
            </button>
            <div className="mt-1">
              <h3 className="font-display font-black text-sm uppercase tracking-[0.2em] text-bg-dark">
                THUKIL
              </h3>
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-bg-secondary/80 block mt-0.5">
                WOVEN IN HERITAGE
              </span>
            </div>
            <p className="text-xs font-light leading-relaxed text-bg-secondary/90 max-w-xs mt-1">
              A design house creating timeless, sculptural silhouettes from ethically sourced, organic, and recycled fibers.
            </p>
          </div>

          {/* Column 1: Shop Collections */}
          <div>
            {/* 🌾 Paddy Stalk Heritage Icon */}
            <div className="mb-3 text-bg-secondary/85 transition-transform duration-300 hover:scale-110 origin-left inline-block">
              <PaddyStalkIcon size={24} />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-bg-dark mb-4">
              Shop Collections
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs font-light text-bg-secondary">
              <li>
                <button
                  onClick={() => setActiveFilter("all")}
                  className="hover:text-bg-dark transition-colors cursor-pointer"
                >
                  All Wardrobe Items
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveFilter("oversized")}
                  className="hover:text-bg-dark transition-colors cursor-pointer"
                >
                  Oversized
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveFilter("polos")}
                  className="hover:text-bg-dark transition-colors cursor-pointer"
                >
                  Polos
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveFilter("regulars")}
                  className="hover:text-bg-dark transition-colors cursor-pointer"
                >
                  Regulars
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Our Studio */}
          <div>
            {/* 🪷 Lotus Motif Heritage Icon */}
            <div className="mb-3 text-bg-secondary/85 transition-transform duration-300 hover:scale-110 origin-left inline-block">
              <LotusIcon size={24} />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-bg-dark mb-4">
              Our Studio
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs font-light text-bg-secondary">
              <li>
                <a href="#" className="hover:text-bg-dark transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-bg-dark transition-colors">
                  Sustainability Pledge
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-bg-dark transition-colors">
                  Material Transparency
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-bg-dark transition-colors">
                  Journal & Editorial
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Support */}
          <div>
            {/* 🪔 Diya / Kuthuvilakku Heritage Icon */}
            <div className="mb-3 text-bg-secondary/85 transition-transform duration-300 hover:scale-110 origin-left inline-block">
              <KuthuvilakkuIcon size={24} />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-bg-dark mb-4">
              Customer Support
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs font-light text-bg-secondary">
              <li>
                <a href="#" className="hover:text-bg-dark transition-colors">
                  Shipping & Customs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-bg-dark transition-colors">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-bg-dark transition-colors">
                  Size Guide & Fits
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-bg-dark transition-colors">
                  Contact Studio
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            CENTER: Tamil Heritage Quote & Credo Block
        ══════════════════════════════════════════════════════ */}
        <div className="my-10 pt-4 flex flex-col items-center justify-center text-center select-none">
          {/* Top Sparkle */}
          <span className="text-xs opacity-70 mb-3 block">✦</span>
          
          {/* Tamil Credo Lines */}
          <h3 className="font-tamil font-bold text-base sm:text-lg tracking-wider text-bg-dark leading-relaxed">
            வேர்களில் தமிழ்
          </h3>
          <h3 className="font-tamil font-bold text-base sm:text-lg tracking-wider text-bg-dark leading-relaxed">
            வடிவத்தில் நவீனம்
          </h3>

          {/* English Tagline */}
          <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.3em] text-bg-secondary/90 mt-3">
            ROOTED IN TRADITION
          </p>
          <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.3em] text-bg-secondary/90">
            DESIGNED TODAY
          </p>

          {/* Heritage Line Ornament: ──── ✧ ✦ 🪔 ✦ ✧ ──── (Matching First Image) */}
          <div className="w-full flex items-center justify-center gap-3 sm:gap-5 my-6 text-bg-secondary/80 select-none">
            {/* Left Fading Line */}
            <div className="h-[1px] w-20 sm:w-40 md:w-56 bg-gradient-to-r from-transparent to-bg-secondary/40" />

            {/* Left Hollow Sparkle Star (✧) */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="opacity-85 flex-shrink-0">
              <path d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22C12 16.5 16.5 12 22 12C16.5 12 12 7.5 12 2Z" />
            </svg>

            {/* Left Solid Sparkle Dot (✦) */}
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="opacity-80 flex-shrink-0">
              <path d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22C12 16.5 16.5 12 22 12C16.5 12 12 7.5 12 2Z" />
            </svg>

            {/* Center Traditional Kuthuvilakku Diya Lamp (🪔) */}
            <div className="flex-shrink-0 px-1 opacity-90">
              <svg width="22" height="30" viewBox="0 0 24 32" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                {/* Flame */}
                <path d="M12 2.5C11 4.5 10.5 5.5 12 7.5C13.5 5.5 13 4.5 12 2.5Z" fill="currentColor" fillOpacity="0.25" />
                {/* Crescent Diya Bowl */}
                <path d="M6 10C8 12.5 16 12.5 18 10C16 14 8 14 6 10Z" />
                {/* Stem Beads */}
                <circle cx="12" cy="17" r="1.8" />
                <circle cx="12" cy="21.5" r="2.2" />
                {/* Semicircle Pedestal Base */}
                <path d="M7 28C7 24.5 9 24 12 24C15 24 17 24.5 17 28" />
                <line x1="5" y1="28" x2="19" y2="28" />
              </svg>
            </div>

            {/* Right Solid Sparkle Dot (✦) */}
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="opacity-80 flex-shrink-0">
              <path d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22C12 16.5 16.5 12 22 12C16.5 12 12 7.5 12 2Z" />
            </svg>

            {/* Right Hollow Sparkle Star (✧) */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="opacity-85 flex-shrink-0">
              <path d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22C12 16.5 16.5 12 22 12C16.5 12 12 7.5 12 2Z" />
            </svg>

            {/* Right Fading Line */}
            <div className="h-[1px] w-20 sm:w-40 md:w-56 bg-gradient-to-l from-transparent to-bg-secondary/40" />
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            BOTTOM BAR: Copyright (Left) & Social/Policies (Right)
        ══════════════════════════════════════════════════════ */}
        <div className="pt-8 border-t border-bg-secondary/20 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between text-[11px] text-bg-secondary/80">
          
          {/* Left: Copyright text block */}
          <div className="flex flex-col gap-1 leading-relaxed">
            <span className="font-medium text-bg-dark/90">&copy; {currentYear} THUKIL.</span>
            <span>All designs protected.</span>
            <span>Crafted ethically.</span>
          </div>

          {/* Right: Social icons & Policy links */}
          <div className="flex flex-col items-start sm:items-end gap-3.5">
            {/* Social Icons: ◎  ♡  f  ▶ */}
            <div className="flex gap-3">
              {socialIcons.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  aria-label={`Follow THUKIL on ${social.name}`}
                  whileHover={{ rotate: 6, scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-bg-secondary/25 bg-bg-secondary/10 hover:bg-bg-dark transition-colors text-bg-secondary hover:text-secondary focus:outline-none focus:ring-1 focus:ring-bg-dark"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            {/* Privacy Policy & Terms */}
            <div className="flex gap-3 text-[11px] text-bg-secondary/70">
              <a href="#" className="hover:underline hover:text-bg-dark transition-colors">
                Privacy Policy
              </a>
              <span>•</span>
              <a href="#" className="hover:underline hover:text-bg-dark transition-colors">
                Terms of Use
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
