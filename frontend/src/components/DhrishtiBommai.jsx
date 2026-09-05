import React from "react";

/**
 * Authentic Dhrishti Bommai (Evil Eye Warding Mascot) Vector SVG Component
 * Faithfully styled after traditional Indian Mahishi / Rakshasa Dhrishti face masks.
 * 
 * Features:
 * - Scalloped curly headdress hair & curved horns
 * - Pointed ears with dangling gold jhumka/kundal earrings
 * - Tilak forehead ornament & crimson third-eye bindi
 * - Expressive wide protective eyes with white sclera & red tear-duct accents
 * - Grand sweeping upward-curled mustache
 * - Sharp white fangs & protruding crimson red tongue
 */

const PALETTES = {
  yellow: {
    face: "#F7C325",
    faceShadow: "#DF9E0B",
    hair: "#1C120C",
    hornsBase: "#557B2F",
    hornsTip: "#F3C641",
    eyesAccent: "#D90429",
    mustache: "#1C120C",
    teeth: "#FFFFFF",
    tongue: "#D90429",
    earring: "#F3B728",
    tilak: "#F3B728",
    bindi: "#D90429",
    foreheadLines: "#DF9E0B"
  },
  blue: {
    face: "#1F597A",
    faceShadow: "#133D54",
    hair: "#101B24",
    hornsBase: "#C78228",
    hornsTip: "#F3C641",
    eyesAccent: "#D90429",
    mustache: "#101B24",
    teeth: "#FFFFFF",
    tongue: "#D90429",
    earring: "#F3B728",
    tilak: "#F3B728",
    bindi: "#D90429",
    foreheadLines: "#133D54"
  },
  iceBlue: {
    face: "#97CADB",
    faceShadow: "#6E9EB0",
    hair: "#1E272E",
    hornsBase: "#C89547",
    hornsTip: "#F5D061",
    eyesAccent: "#D90429",
    mustache: "#48281A",
    teeth: "#FFFFFF",
    tongue: "#D90429",
    earring: "#F5D061",
    tilak: "#F5D061",
    bindi: "#D90429",
    foreheadLines: "#6E9EB0"
  },
  maroon: {
    face: "#7F2424",
    faceShadow: "#5A1616",
    hair: "#200B0B",
    hornsBase: "#D08A3E",
    hornsTip: "#F5C453",
    eyesAccent: "#FF4D6D",
    mustache: "#F7F0E8", // White mustache on deep maroon like reference
    teeth: "#FFFFFF",
    tongue: "#FF2A55",
    earring: "#F5C453",
    tilak: "#F5C453",
    bindi: "#FF2A55",
    foreheadLines: "#5A1616"
  },
  green: {
    face: "#2E7250",
    faceShadow: "#1D5237",
    hair: "#132E20",
    hornsBase: "#D49E34",
    hornsTip: "#F7CE55",
    eyesAccent: "#D90429",
    mustache: "#132E20",
    teeth: "#FFFFFF",
    tongue: "#D90429",
    earring: "#F7CE55",
    tilak: "#F7CE55",
    bindi: "#D90429",
    foreheadLines: "#1D5237"
  },
  chocolate: {
    face: "#5E3929",
    faceShadow: "#432417",
    hair: "#1D100A",
    hornsBase: "#C98836",
    hornsTip: "#F3C54E",
    eyesAccent: "#D90429",
    mustache: "#F3ECE1",
    teeth: "#FFFFFF",
    tongue: "#D90429",
    earring: "#F3C54E",
    tilak: "#F3C54E",
    bindi: "#D90429",
    foreheadLines: "#432417"
  },
  terracotta: {
    face: "#B85538",
    faceShadow: "#8C3820",
    hair: "#2A130C",
    hornsBase: "#DFA036",
    hornsTip: "#F8CD5B",
    eyesAccent: "#D90429",
    mustache: "#2A130C",
    teeth: "#FFFFFF",
    tongue: "#D90429",
    earring: "#F8CD5B",
    tilak: "#F8CD5B",
    bindi: "#D90429",
    foreheadLines: "#8C3820"
  },
  gold: {
    face: "#E39C24",
    faceShadow: "#BA7710",
    hair: "#22140A",
    hornsBase: "#2F6533",
    hornsTip: "#FAD864",
    eyesAccent: "#D90429",
    mustache: "#22140A",
    teeth: "#FFFFFF",
    tongue: "#D90429",
    earring: "#FAD864",
    tilak: "#FAD864",
    bindi: "#D90429",
    foreheadLines: "#BA7710"
  }
};

/**
 * Resolve palette based on variant name or custom color hex
 */
function resolvePalette(variant, customColor) {
  if (variant && PALETTES[variant]) {
    return PALETTES[variant];
  }
  if (customColor) {
    const c = customColor.toLowerCase();
    if (c.includes("2d6a2d") || c.includes("green") || c.includes("2e7250")) return PALETTES.green;
    if (c.includes("006b8f") || c.includes("blue") || c.includes("1f597a") || c.includes("1d4e6b")) return PALETTES.blue;
    if (c.includes("cc2200") || c.includes("red") || c.includes("7b1e1e") || c.includes("7f2424") || c.includes("maroon")) return PALETTES.maroon;
    if (c.includes("e8a020") || c.includes("yellow") || c.includes("gold") || c.includes("f7c325") || c.includes("f5c400")) return PALETTES.yellow;
    if (c.includes("brown") || c.includes("5e3929")) return PALETTES.chocolate;
    
    // Dynamically synthesize from customColor
    return {
      ...PALETTES.yellow,
      face: customColor,
      faceShadow: "#00000033",
      foreheadLines: "#00000025"
    };
  }
  return PALETTES.yellow;
}

export default function DhrishtiBommai({
  variant = "yellow",
  color,
  size = 56,
  className = "",
  style = {},
  title = "Dhrishti Bommai"
}) {
  const p = resolvePalette(variant, color);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none ${className}`}
      style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.12))", ...style }}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>

      <defs>
        {/* Horns Gradients */}
        <linearGradient id={`horn-left-${p.face.replace(/[^a-zA-Z0-9]/g, '')}`} x1="20" y1="12" x2="38" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={p.hornsTip} />
          <stop offset="60%" stopColor={p.hornsBase} />
          <stop offset="100%" stopColor={p.hair} />
        </linearGradient>
        <linearGradient id={`horn-right-${p.face.replace(/[^a-zA-Z0-9]/g, '')}`} x1="100" y1="12" x2="82" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={p.hornsTip} />
          <stop offset="60%" stopColor={p.hornsBase} />
          <stop offset="100%" stopColor={p.hair} />
        </linearGradient>

        {/* Earring Gold Gradient */}
        <radialGradient id="earring-grad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFF2A3" />
          <stop offset="50%" stopColor="#E5A61D" />
          <stop offset="100%" stopColor="#966304" />
        </radialGradient>
      </defs>

      {/* ── 1. HORNS (Behind hair) ── */}
      {/* Left Horn */}
      <path
        d="M37 36 C34 22, 22 15, 17 12 C23 23, 27 33, 34 40 Z"
        fill={`url(#horn-left-${p.face.replace(/[^a-zA-Z0-9]/g, '')})`}
        stroke="#110B07"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* Right Horn */}
      <path
        d="M83 36 C86 22, 98 15, 103 12 C97 23, 93 33, 86 40 Z"
        fill={`url(#horn-right-${p.face.replace(/[^a-zA-Z0-9]/g, '')})`}
        stroke="#110B07"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* ── 2. EARS & EARRINGS ── */}
      {/* Left Ear */}
      <path
        d="M27 48 C16 48, 14 62, 24 67 C25 61, 26 55, 27 48 Z"
        fill={p.face}
        stroke="#1C120C"
        strokeWidth="1.4"
      />
      <path d="M23 54 C19 56, 19 60, 23 62" stroke="#1C120C" strokeWidth="1" strokeLinecap="round" fill="none" />
      {/* Left Earring Drop */}
      <line x1="20" y1="67" x2="20" y2="72" stroke="#B87D09" strokeWidth="1.5" />
      <circle cx="20" cy="76" r="4.2" fill="url(#earring-grad)" stroke="#7A4E03" strokeWidth="0.8" />
      <circle cx="20" cy="76" r="1.5" fill="#FFF2A3" />

      {/* Right Ear */}
      <path
        d="M93 48 C104 48, 106 62, 96 67 C95 61, 94 55, 93 48 Z"
        fill={p.face}
        stroke="#1C120C"
        strokeWidth="1.4"
      />
      <path d="M97 54 C101 56, 101 60, 97 62" stroke="#1C120C" strokeWidth="1" strokeLinecap="round" fill="none" />
      {/* Right Earring Drop */}
      <line x1="100" y1="67" x2="100" y2="72" stroke="#B87D09" strokeWidth="1.5" />
      <circle cx="100" cy="76" r="4.2" fill="url(#earring-grad)" stroke="#7A4E03" strokeWidth="0.8" />
      <circle cx="100" cy="76" r="1.5" fill="#FFF2A3" />

      {/* ── 3. SCALLOPED CURLY HAIR (Outer Arc) ── */}
      <g fill={p.hair} stroke="#0A0604" strokeWidth="1">
        {/* Left temple curls */}
        <circle cx="25" cy="46" r="5" />
        <circle cx="27" cy="38" r="5.5" />
        {/* Top headdress curls */}
        <circle cx="33" cy="29" r="6.2" />
        <circle cx="43" cy="22" r="6.5" />
        <circle cx="53" cy="19" r="6.8" />
        <circle cx="60" cy="18" r="7" />
        <circle cx="67" cy="19" r="6.8" />
        <circle cx="77" cy="22" r="6.5" />
        <circle cx="87" cy="29" r="6.2" />
        {/* Right temple curls */}
        <circle cx="93" cy="38" r="5.5" />
        <circle cx="95" cy="46" r="5" />
      </g>

      {/* ── 4. MAIN FACE MASK BASE ── */}
      <path
        d="M32 36 C32 30, 44 26, 60 26 C76 26, 88 30, 88 36 C88 46, 94 54, 94 67 C94 85, 78 99, 60 101 C42 99, 26 85, 26 67 C26 54, 32 46, 32 36 Z"
        fill={p.face}
        stroke="#1C120C"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      {/* Subtle Cheek & Chin Contour Shadows */}
      <path
        d="M28 66 C28 82, 42 96, 60 98 C78 96, 92 82, 92 66"
        fill="none"
        stroke={p.faceShadow}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.4"
      />

      {/* ── 5. INNER HAIR FRINGE (Forehead framing curls) ── */}
      <g fill={p.hair} opacity="0.95">
        <path d="M32 36 C35 32, 40 32, 44 35 C48 31, 54 31, 60 34 C66 31, 72 31, 76 35 C80 32, 85 32, 88 36 C82 32, 74 34, 60 33 C46 34, 38 32, 32 36 Z" />
      </g>

      {/* ── 6. FOREHEAD ORNAMENT / TILAK & BINDI ── */}
      {/* Traditional Crown Waves / Forehead Tilak */}
      <path
        d="M44 35 Q60 29 76 35"
        stroke={p.tilak}
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M48 39 Q60 34 72 39"
        stroke={p.tilak}
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="60" cy="32" r="1.8" fill={p.tilak} />

      {/* Crimson Bindi (Center of Forehead) */}
      <circle cx="60" cy="42" r="3.6" fill={p.bindi} stroke="#FFF" strokeWidth="0.5" />

      {/* Eyebrow Arch Ripple Lines (Fierce expression) */}
      <path d="M48 43 Q54 41 57 43" stroke={p.foreheadLines} strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M72 43 Q66 41 63 43" stroke={p.foreheadLines} strokeWidth="1.2" strokeLinecap="round" fill="none" />

      {/* ── 7. EYEBROWS ── */}
      {/* Left Eyebrow */}
      <path
        d="M33 50 C37 43, 49 42, 57 47 C52 45, 41 46, 33 50 Z"
        fill={p.mustache === "#F7F0E8" || p.mustache === "#F3ECE1" ? p.hair : p.mustache}
        stroke="#110B07"
        strokeWidth="0.8"
      />
      {/* Right Eyebrow */}
      <path
        d="M87 50 C83 43, 71 42, 63 47 C68 45, 79 46, 87 50 Z"
        fill={p.mustache === "#F7F0E8" || p.mustache === "#F3ECE1" ? p.hair : p.mustache}
        stroke="#110B07"
        strokeWidth="0.8"
      />

      {/* ── 8. EYES (Wide & Protective) ── */}
      {/* Left Eye Sclera */}
      <path
        d="M34 54 C38 48, 51 48, 56 54 C51 60, 38 60, 34 54 Z"
        fill="#FFFFFF"
        stroke="#1C120C"
        strokeWidth="1.4"
      />
      {/* Left Eye Red Tearduct */}
      <path d="M53 53.5 C54.5 53.5, 55.5 54, 56 54 C55.5 54.5, 54.5 55, 53 54.5 Z" fill={p.eyesAccent} />
      {/* Left Pupil/Iris */}
      <circle cx="44" cy="54" r="4.2" fill="#150E09" />
      <circle cx="45.5" cy="52.8" r="1.3" fill="#FFFFFF" />
      {/* Left Under-Eye Arc */}
      <path d="M36 58 Q45 62.5 53 58" stroke={p.eyesAccent} strokeWidth="1.2" strokeLinecap="round" fill="none" />

      {/* Right Eye Sclera */}
      <path
        d="M64 54 C69 48, 82 48, 86 54 C82 60, 69 60, 64 54 Z"
        fill="#FFFFFF"
        stroke="#1C120C"
        strokeWidth="1.4"
      />
      {/* Right Eye Red Tearduct */}
      <path d="M67 53.5 C65.5 53.5, 64.5 54, 64 54 C64.5 54.5, 65.5 55, 67 54.5 Z" fill={p.eyesAccent} />
      {/* Right Pupil/Iris */}
      <circle cx="76" cy="54" r="4.2" fill="#150E09" />
      <circle cx="77.5" cy="52.8" r="1.3" fill="#FFFFFF" />
      {/* Right Under-Eye Arc */}
      <path d="M67 58 Q75 62.5 84 58" stroke={p.eyesAccent} strokeWidth="1.2" strokeLinecap="round" fill="none" />

      {/* ── 9. NOSE ── */}
      <path
        d="M58 50 L57 61 C55 62, 53 63.5, 53 65.5 C53 67.5, 56 68.5, 60 68.5 C64 68.5, 67 67.5, 67 65.5 C67 63.5, 65 62, 63 61 L62 50"
        stroke="#1C120C"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Nostril Holes */}
      <ellipse cx="56.5" cy="65.5" rx="1.6" ry="1.2" fill="#1C120C" />
      <ellipse cx="63.5" cy="65.5" rx="1.6" ry="1.2" fill="#1C120C" />

      {/* ── 10. MOUTH, FANGS & PROTRUDING TONGUE ── */}
      {/* Dark Mouth Cavity behind Mustache */}
      <path
        d="M44 73 Q60 81 76 73 Q60 89 44 73 Z"
        fill="#380A0A"
        stroke="#1C120C"
        strokeWidth="1.2"
      />

      {/* Upper Sharp Fangs / Teeth */}
      <path d="M47 73 L49.5 80 L52 73 Z" fill={p.teeth} stroke="#1C120C" strokeWidth="0.6" />
      <path d="M68 73 L70.5 80 L73 73 Z" fill={p.teeth} stroke="#1C120C" strokeWidth="0.6" />
      <path d="M53 73 L55 76 L57 73 Z" fill={p.teeth} />
      <path d="M63 73 L65 76 L67 73 Z" fill={p.teeth} />

      {/* Protruding Crimson Tongue (Extending past lower lip onto chin) */}
      <path
        d="M54 74 C54 74, 53 85, 54 90 C55 94, 60 97, 60 97 C60 97, 65 94, 66 90 C67 85, 66 74, 66 74 Z"
        fill={p.tongue}
        stroke="#1C120C"
        strokeWidth="1.2"
      />
      {/* Tongue Center Crease */}
      <line x1="60" y1="76" x2="60" y2="92" stroke="#8A0015" strokeWidth="1.2" strokeLinecap="round" />

      {/* ── 11. GRAND UPWARD-SWEEPING MUSTACHE ── */}
      <path
        d="M24 62 C34 65, 46 68, 60 71 C74 68, 86 65, 96 62 C100 60, 104 63, 102 67 C97 73, 89 74, 80 74 C73 74, 66 76, 60 78 C54 76, 47 74, 40 74 C31 74, 23 73, 18 67 C16 63, 20 60, 24 62 Z"
        fill={p.mustache}
        stroke="#110B07"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />

      {/* ── 12. CHIN TUFT / BEARD ACCENT ── */}
      <path
        d="M56 99 Q60 102 64 99"
        stroke={p.mustache === "#F7F0E8" || p.mustache === "#F3ECE1" ? p.mustache : p.faceShadow}
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

// Backward-compatible alias for existing imports
export { DhrishtiBommai as DrishtiDollFace };
