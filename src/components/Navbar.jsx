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
    { label: "Tailored Classics", id: "tailoring" },
    { label: "Knitwear & Lounge", id: "lounge" },
    { label: "Summer Editorial", id: "summer" }
  ];

  const handleNavClick = (id) => {
    setActiveFilter(id);
    if (location.pathname !== "/") {
      navigate(`/?collection=${id}`);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#e5e4e7] bg-[#f9f6f0]/85 backdrop-blur-md transition-colors duration-300">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-[#111111] hover:opacity-75 transition-opacity focus:outline-none cursor-pointer"
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
                className="relative py-2 text-xs font-semibold uppercase tracking-widest text-[#111111] hover:text-[#6F4E37] transition-colors cursor-pointer"
              >
                {link.label}
                {location.pathname === "/" && activeFilter === link.id && (
                  <motion.div
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-0 h-[2px] w-full bg-[#6F4E37]"
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
              className="font-display text-3xl font-extrabold tracking-tight text-[#111111] focus:outline-none hover:opacity-85 transition-opacity"
            >
              AURA<span className="font-accent text-lg font-normal lowercase tracking-normal text-[#6F4E37] ml-0.5">studio</span>
            </Link>
          </div>

          {/* Icons & Action Links - Right */}
          <div className="flex items-center gap-2 sm:gap-4 text-xs font-semibold uppercase tracking-wider text-[#111111] lg:flex-1 lg:justify-end">
            {/* Pages: About & Contact (Desktop) */}
            <div className="hidden lg:flex items-center gap-5 mr-2">
              <Link to="/about" className="hover:text-[#6F4E37] transition-colors">About</Link>
              <Link to="/contact" className="hover:text-[#6F4E37] transition-colors">Contact</Link>
            </div>

            {/* User Info & Nav Links (Desktop) */}
            <div className="hidden lg:flex items-center gap-4">
              {!isAuthenticated ? (
                <>
                  <Link to="/login" className="hover:text-[#6F4E37] transition-colors">Login</Link>
                  <Link
                    to="/register"
                    className="rounded-lg bg-[#4B352A] hover:bg-[#6F4E37] text-white px-3 py-1.5 transition-colors"
                  >
                    Register
                  </Link>
                </>
              ) : role === "admin" ? (
                <>
                  <Link to="/admin/dashboard" className="flex items-center gap-1 hover:text-[#6F4E37] text-[#556B2F]">
                    <LayoutDashboard size={14} />
                    Admin
                  </Link>
                  <button onClick={handleLogout} className="hover:text-[#6D6D6D] cursor-pointer">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/profile" className="hover:text-[#6F4E37] transition-colors">Profile</Link>
                  <Link to="/orders" className="hover:text-[#6F4E37] transition-colors">Orders</Link>
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
              className="p-2 text-[#111111] hover:text-[#6F4E37] transition-colors focus:outline-none cursor-pointer"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* Wishlist */}
            {role !== "admin" && (
              <Link
                to="/wishlist"
                className={`relative p-2 transition-colors focus:outline-none ${
                  location.pathname === "/wishlist" ? "text-[#6F4E37]" : "text-[#111111] hover:text-[#6F4E37]"
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
                      className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#6F4E37] text-[10px] font-bold text-white shadow-sm"
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
                className="relative p-2 text-[#111111] hover:text-[#6F4E37] transition-colors focus:outline-none cursor-pointer"
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
                      className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#111111] text-[10px] font-bold text-white shadow-sm"
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
                <div className="flex items-center justify-between pb-6 border-b border-[#e5e4e7]">
                  <span className="font-display text-2xl font-bold tracking-tight">AURA</span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-[#111111] hover:opacity-75 focus:outline-none cursor-pointer"
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
                      className="flex items-center justify-between text-left text-sm py-2 border-b border-transparent hover:border-[#6F4E37] transition-all cursor-pointer text-[#111111]"
                    >
                      <span className={activeFilter === link.id ? "text-[#6F4E37]" : ""}>
                        {link.label}
                      </span>
                      <ArrowRight size={16} className="opacity-40" />
                    </button>
                  ))}
                  
                  <Link
                    to="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2 text-sm text-[#111111]"
                  >
                    About Us
                    <ArrowRight size={16} className="opacity-40" />
                  </Link>

                  <Link
                    to="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2 text-sm text-[#111111]"
                  >
                    Contact
                    <ArrowRight size={16} className="opacity-40" />
                  </Link>

                  <div className="border-t border-[#e5e4e7] pt-4 mt-2 space-y-4">
                    {!isAuthenticated ? (
                      <>
                        <Link
                          to="/login"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-center py-2.5 rounded-xl border border-[#4B352A] text-[#4B352A] hover:bg-[#F5F1E8]"
                        >
                          Login
                        </Link>
                        <Link
                          to="/register"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-center py-2.5 rounded-xl bg-[#4B352A] text-white hover:bg-[#6F4E37]"
                        >
                          Register
                        </Link>
                      </>
                    ) : role === "admin" ? (
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
                          className="w-full text-center py-2.5 text-[#6D6D6D] border border-black/10 rounded-xl cursor-pointer"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/profile"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-center py-2 text-sm text-[#111111]"
                        >
                          My Profile
                        </Link>
                        <Link
                          to="/orders"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-center py-2 text-sm text-[#111111]"
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

              <div className="border-t border-[#e5e4e7] pt-6 text-[10px] text-[#6b6375] tracking-widest uppercase">
                &copy; 2026 AURA Studio. All rights reserved.
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
