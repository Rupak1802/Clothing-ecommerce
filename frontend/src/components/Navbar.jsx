import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, Menu, X, ArrowRight, User, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

export default function Navbar() {
  const { isAuthenticated, currentUser, role, logout } = useAuth();
  const {
    wishlist,
    cartItemsCount,
    setCartOpen,
    setSearchOpen,
    activeFilter,
    setActiveFilter
  } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully.");
    navigate("/");
  };

  const navLinks = [
    { label: "All Items", id: "all" },
    { label: "Oversized", id: "oversized" },
    { label: "Polos", id: "polos" },
    { label: "Regulars", id: "regulars" }
  ];

  const handleNavClick = (id) => {
    setActiveFilter(id);
    if (location.pathname !== "/") {
      navigate(`/?collection=${id}`);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#E8A020]/20" style={{ background: "rgba(255,248,240,0.96)", backdropFilter: "blur(16px)" }}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-text-primary hover:opacity-75 transition-opacity focus:outline-none cursor-pointer"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Nav Links - Left side (Desktop) */}
          <nav className="hidden lg:flex lg:flex-1 lg:gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="relative py-2 text-xs font-semibold uppercase tracking-widest hover:text-[#C1440E] transition-colors cursor-pointer"
                style={{ color: "rgba(28,10,0,0.85)" }}
              >
                {link.label}
                {location.pathname === "/" && activeFilter === link.id && (
                  <motion.div
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-0 h-[2px] w-full"
                    style={{ background: "#E8A020" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Logo - Center */}
          <div className="flex-1 lg:flex-none lg:mx-8 text-center">
            <Link
              to="/"
              onClick={() => setActiveFilter("all")}
              className="focus:outline-none hover:opacity-85 transition-opacity flex items-center"
            >
              <img src="/LOGO 5.png" alt="THUKIL Logo" className="h-10 w-auto object-contain mix-blend-multiply" style={{ filter: "invert(1)" }} />
            </Link>
          </div>

          {/* Icons & Action Links - Right */}
          <div className="flex items-center gap-2 sm:gap-4 text-xs font-semibold uppercase tracking-wider lg:flex-1 lg:justify-end" style={{ color: "rgba(28,10,0,0.85)" }}>
            {/* Pages: About & Contact (Desktop) */}
            <div className="hidden lg:flex items-center gap-5 mr-2">
              <Link to="/about" className="transition-colors hover:text-[#C1440E]" style={{ color: "rgba(28,10,0,0.8)" }}>About</Link>
              <Link to="/contact" className="transition-colors hover:text-[#C1440E]" style={{ color: "rgba(28,10,0,0.8)" }}>Contact</Link>
            </div>

            {/* User Info & Nav Links (Desktop) */}
            <div className="hidden lg:flex items-center gap-4">
              {!isAuthenticated ? null : role === "admin" ? (
                <>
                  <Link to="/admin/dashboard" className="flex items-center gap-1 hover:text-[var(--color-border)] text-[#556B2F]">
                    <LayoutDashboard size={14} />
                    Admin
                  </Link>
                  <button onClick={handleLogout} className="hover:text-[#6D6D6D] cursor-pointer">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/profile" className="hover:text-[var(--color-border)] transition-colors">Profile</Link>
                  <Link to="/orders" className="hover:text-[var(--color-border)] transition-colors">Orders</Link>
                  <button onClick={handleLogout} className="hover:text-red-700 cursor-pointer">
                    Logout
                  </button>
                </>
              )}
            </div>

            {/* Divider (Desktop) */}
            <span className="hidden lg:inline-block h-5 w-[1px] bg-black/10 mx-1" />

            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-text-primary hover:text-[var(--color-border)] transition-colors focus:outline-none cursor-pointer"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* Wishlist */}
            {role !== "admin" && (
              <Link
                to="/wishlist"
                className={`relative p-2 transition-colors focus:outline-none ${
                  location.pathname === "/wishlist" ? "text-primary" : "text-text-primary hover:text-primary"
                }`}
                aria-label="Wishlist"
              >
                <Heart size={20} fill={location.pathname === "/wishlist" ? "currentColor" : "none"} />
                <AnimatePresence>
                  {wishlist.length > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-bg-dark shadow-sm"
                    >
                      {wishlist.length}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            )}

            {/* Cart */}
            {role !== "admin" && (
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 text-text-primary hover:text-primary transition-colors focus:outline-none cursor-pointer"
                aria-label="Open cart"
              >
                <ShoppingBag size={20} />
                <AnimatePresence>
                  {cartItemsCount > 0 && (
                    <motion.span
                      key={cartItemsCount}
                      initial={{ scale: 0.5, y: -2 }}
                      animate={{ scale: [1.3, 1], y: 0 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                      className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-bg-dark shadow-sm"
                    >
                      {cartItemsCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            )}
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
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            {/* Drawer menu */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed bottom-0 top-0 left-0 z-50 w-full max-w-xs p-6 shadow-2xl flex flex-col justify-between"
              style={{ background: "#1C0A00", borderRight: "1px solid rgba(232,160,32,0.15)" }}
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-border">
                  <img src="/LOGO 5.png" alt="THUKIL Logo" className="h-12 w-auto object-contain mix-blend-screen" style={{ filter: "sepia(1) saturate(5) hue-rotate(10deg) brightness(1.5)" }} />
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-text-light hover:opacity-75 focus:outline-none cursor-pointer"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="mt-8 flex flex-col gap-5 text-xs font-semibold uppercase tracking-wider text-left">
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => {
                        handleNavClick(link.id);
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center justify-between text-left text-sm py-2 border-b border-transparent hover:border-border transition-all cursor-pointer text-text-primary"
                    >
                      <span className={activeFilter === link.id ? "text-primary" : ""}>
                        {link.label}
                      </span>
                      <ArrowRight size={16} className="opacity-40" />
                    </button>
                  ))}
                  
                  <Link
                    to="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2 text-sm text-text-light"
                  >
                    About Us
                    <ArrowRight size={16} className="opacity-40" />
                  </Link>

                  <Link
                    to="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2 text-sm text-text-light"
                  >
                    Contact
                    <ArrowRight size={16} className="opacity-40" />
                  </Link>

                  <div className="border-t border-border pt-4 mt-2 space-y-4">
                    {!isAuthenticated ? null : role === "admin" ? (
                      <>
                        <Link
                          to="/admin/dashboard"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-center py-2.5 rounded-xl bg-[#556B2F] text-white"
                        >
                          Admin Dashboard
                        </Link>
                        <button
                          onClick={() => {
                            setMobileMenuOpen(false);
                            handleLogout();
                          }}
                          className="w-full text-center py-2.5 text-[#6D6D6D] border border-white/10 rounded-xl cursor-pointer"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/profile"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-center py-2 text-sm text-text-light"
                        >
                          My Profile
                        </Link>
                        <Link
                          to="/orders"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-center py-2 text-sm text-text-light"
                        >
                          My Orders
                        </Link>
                        <button
                          onClick={() => {
                            setMobileMenuOpen(false);
                            handleLogout();
                          }}
                          className="w-full text-center py-2.5 rounded-xl border border-red-200 text-red-700 bg-red-50 cursor-pointer"
                        >
                          Logout
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6 text-[10px] text-text-muted tracking-widest uppercase">
                &copy; 2026 THUKIL. All rights reserved.
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
