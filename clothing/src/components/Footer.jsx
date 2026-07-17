import { motion } from "framer-motion";
import { Instagram, Twitter, Facebook, Pin as Pinterest } from "lucide-react";

export default function Footer({ setActiveFilter }) {
  const socialIcons = [
    { icon: <Instagram size={18} />, href: "#", name: "Instagram" },
    { icon: <Twitter size={18} />, href: "#", name: "Twitter" },
    { icon: <Facebook size={18} />, href: "#", name: "Facebook" },
    { icon: <Pinterest size={18} />, href: "#", name: "Pinterest" }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111111] text-white border-t border-white/10 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <button
              onClick={() => setActiveFilter("all")}
              className="text-left font-display text-2xl font-bold tracking-tight text-white hover:opacity-85 transition-opacity"
            >
              AURA<span className="font-accent text-sm font-normal lowercase tracking-normal text-[#ff2a74] ml-0.5">studio</span>
            </button>
            <p className="text-xs font-light leading-relaxed text-white/50 max-w-xs">
              A design house creating timeless, sculptural silhouettes from ethically sourced, organic, and recycled fibers.
            </p>
          </div>

          {/* Column 1: Shop */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#ff2a74] mb-4">
              Shop Collections
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs font-light text-white/60">
              <li>
                <button
                  onClick={() => setActiveFilter("all")}
                  className="hover:text-white transition-colors"
                >
                  All Wardrobe Items
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveFilter("tailoring")}
                  className="hover:text-white transition-colors"
                >
                  Minimalist Tailoring
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveFilter("lounge")}
                  className="hover:text-white transition-colors"
                >
                  Knitwear & Loungewear
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveFilter("summer")}
                  className="hover:text-white transition-colors"
                >
                  Summer Linen Capsule
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Studio */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Our Studio
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs font-light text-white/60">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Sustainability Pledge
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Material Transparency
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Journal & Editorial
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Customer Support
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs font-light text-white/60">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Shipping & Customs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Size Guide & Fits
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Studio
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-[11px] text-white/40">
          <div>
            &copy; {currentYear} AURA Studio. All designs protected. Crafted ethically.
          </div>

          {/* Social Icons with spring physics */}
          <div className="flex gap-4">
            {socialIcons.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                aria-label={`Follow AURA on ${social.name}`}
                whileHover={{ rotate: 12, scale: 1.15, color: "#ff2a74" }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 hover:border-[#ff2a74]/30 transition-colors text-white/80 focus:outline-none focus:ring-1 focus:ring-[#ff2a74]"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          <div className="flex gap-4">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#" className="hover:underline">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
