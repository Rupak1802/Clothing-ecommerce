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
    <footer className="bg-secondary text-bg-secondary border-t border-bg-secondary/20 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:gap-8 pb-12 border-b border-bg-secondary/20">
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <button
              onClick={() => setActiveFilter("all")}
              className="text-left hover:opacity-85 transition-opacity"
            >
              <img src="/LOGO 5.png" alt="THUKIL Logo" className="h-16 w-auto object-contain mix-blend-multiply" style={{ filter: "invert(1)" }} />
            </button>
            <p className="text-xs font-light leading-relaxed text-bg-secondary/90 max-w-xs">
              A design house creating timeless, sculptural silhouettes from ethically sourced, organic, and recycled fibers.
            </p>
          </div>

          {/* Column 1: Shop */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-bg-dark mb-4">
              Shop Collections
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs font-light text-bg-secondary">
              <li>
                <button
                  onClick={() => setActiveFilter("all")}
                  className="hover:text-bg-dark transition-colors"
                >
                  All Wardrobe Items
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveFilter("oversized")}
                  className="hover:text-bg-dark transition-colors"
                >
                  Oversized
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveFilter("polos")}
                  className="hover:text-bg-dark transition-colors"
                >
                  Polos
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveFilter("regulars")}
                  className="hover:text-bg-dark transition-colors"
                >
                  Regulars
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Studio */}
          <div>
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

          {/* Column 3: Customer Care */}
          <div>
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

        {/* Footer Bottom */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-[11px] text-bg-secondary/80">
          <div>
            &copy; {currentYear} THUKIL. All designs protected. Crafted ethically.
          </div>

          {/* Social Icons with spring physics */}
          <div className="flex gap-4">
            {socialIcons.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                aria-label={`Follow THUKIL on ${social.name}`}
                whileHover={{ rotate: 12, scale: 1.15, color: "var(--color-secondary)" }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-transparent bg-bg-secondary hover:bg-bg-dark transition-colors text-secondary focus:outline-none focus:ring-1 focus:ring-bg-dark"
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
