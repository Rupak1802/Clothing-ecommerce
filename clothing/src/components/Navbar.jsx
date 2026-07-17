import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, Menu, X, ArrowRight } from "lucide-react";

export default function Navbar({
  cartCount,
  wishlistCount,
  onCartClick,
  activeFilter,
  setActiveFilter,
  onSearchOpen,
  cartItemsCount
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "All Items", id: "all" },
    { label: "Tailored Classics", id: "tailoring" },
    { label: "Knitwear & Lounge", id: "lounge" },
    { label: "Summer Editorial", id: "summer" }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#e5e4e7] bg-[#f9f6f0]/85 backdrop-blur-md transition-colors duration-300">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-[#111111] hover:opacity-75 transition-opacity focus:outline-none"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Nav Links - Left side (Desktop) */}
          <nav className="hidden lg:flex lg:gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActiveFilter(link.id)}
                className="relative py-2 text-sm font-medium uppercase tracking-widest text-[#111111] hover:text-[#ff2a74] transition-colors"
              >
                {link.label}
                {activeFilter === link.id && (
                  <motion.div
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-0 h-[2px] w-full bg-[#ff2a74]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Logo - Center */}
          <div className="flex-1 lg:flex-none text-center">
            <button
              onClick={() => setActiveFilter("all")}
              className="font-display text-3xl font-extrabold tracking-tight text-[#111111] focus:outline-none hover:opacity-85 transition-opacity"
            >
              AURA<span className="font-accent text-lg font-normal lowercase tracking-normal text-[#ff2a74] ml-0.5">studio</span>
            </button>
          </div>

          {/* Icons - Right */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search */}
            <button
              onClick={onSearchOpen}
              className="p-2 text-[#111111] hover:text-[#ff2a74] transition-colors focus:outline-none"
              aria-label="Search"
            >
              <Search size={22} />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setActiveFilter(activeFilter === "wishlist" ? "all" : "wishlist")}
              className={`relative p-2 transition-colors focus:outline-none ${
                activeFilter === "wishlist" ? "text-[#ff2a74]" : "text-[#111111] hover:text-[#ff2a74]"
              }`}
              aria-label="Wishlist"
            >
              <Heart size={22} fill={activeFilter === "wishlist" ? "currentColor" : "none"} />
              <AnimatePresence>
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#ff2a74] text-[10px] font-bold text-white shadow-sm"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Cart */}
            <button
              onClick={onCartClick}
              className="relative p-2 text-[#111111] hover:text-[#ff2a74] transition-colors focus:outline-none"
              aria-label="Open cart"
            >
              <ShoppingBag size={22} />
              <AnimatePresence>
                {cartItemsCount > 0 && (
                  <motion.span
                    key={cartItemsCount}
                    initial={{ scale: 0.5, y: -2 }}
                    animate={{ scale: [1.3, 1], y: 0 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#111111] text-[10px] font-bold text-white shadow-sm"
                  >
                    {cartItemsCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Slide-in Mobile Nav Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-[#111111]"
            />

            {/* Drawer menu */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed bottom-0 top-0 left-0 z-50 w-full max-w-xs bg-[#f9f6f0] p-6 shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-8 border-b border-[#e5e4e7]">
                  <span className="font-display text-2xl font-bold tracking-tight">AURA</span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-[#111111] hover:opacity-75 focus:outline-none"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="mt-8 flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => {
                        setActiveFilter(link.id);
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center justify-between text-left text-lg font-medium tracking-wide text-[#111111] border-b border-transparent hover:border-[#ff2a74] pb-2 transition-all"
                    >
                      <span className={activeFilter === link.id ? "text-[#ff2a74]" : ""}>
                        {link.label}
                      </span>
                      <ArrowRight size={18} className="opacity-40" />
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setActiveFilter("wishlist");
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-between text-left text-lg font-medium tracking-wide text-[#111111] hover:text-[#ff2a74] border-b border-transparent hover:border-[#ff2a74] pb-2 transition-all"
                  >
                    <span className={activeFilter === "wishlist" ? "text-[#ff2a74]" : ""}>
                      My Wishlist
                    </span>
                    <ArrowRight size={18} className="opacity-40" />
                  </button>
                </div>
              </div>

              <div className="border-t border-[#e5e4e7] pt-6 text-xs text-[#6b6375] tracking-wider uppercase">
                &copy; 2026 AURA Studio. All rights reserved.
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
