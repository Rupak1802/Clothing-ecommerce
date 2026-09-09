import { useRef, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { useCart } from "../context/CartContext";

// Components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import QuickViewModal from "../components/QuickViewModal";
import CartDrawer from "../components/CartDrawer";

export default function CustomerLayout() {
  const {
    cart,
    wishlist,
    cartOpen,
    setCartOpen,
    quickViewProduct,
    isQuickViewOpen,
    closeQuickView,
    addToCart,
    toggleWishlist,
    removeFromCart,
    updateQuantity,
    cartItemsCount,
    searchOpen,
    setSearchOpen,
    searchQuery,
    setSearchQuery,
    activeFilter
  } = useCart();

  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current.focus(), 100);
    }
  }, [searchOpen]);

  // If a search query is typed and we're not on `/products` or `/`, redirect to `/` or a products page so search is visual!
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (location.pathname !== "/" && location.pathname !== "/products") {
      navigate("/");
    }
  };

  const handleSelectCollection = (collectionId) => {
    // If on collections or about page, redirect to Home with filter
    navigate(`/?collection=${collectionId}`);
  };

  return (
    <div className="min-h-screen text-text-primary antialiased flex flex-col justify-between customer-portal">
      <div>
        <Navbar
          cartCount={cartItemsCount}
          wishlistCount={wishlist.length}
          onCartClick={() => setCartOpen(true)}
          onSearchOpen={() => setSearchOpen(true)}
          cartItemsCount={cartItemsCount}
        />

        <main className="w-full">
          <Outlet />
        </main>
      </div>

      <Footer setActiveFilter={handleSelectCollection} />

      {/* Quick View Modal Overlay */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={closeQuickView}
        onAddToCart={addToCart}
        isWishlisted={
          quickViewProduct ? wishlist.some((item) => item.id === quickViewProduct.id) : false
        }
        onToggleWishlist={toggleWishlist}
      />

      {/* Cart Drawer Panel */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={() => {
          setCartOpen(false);
          navigate("/checkout");
        }}
      />

      {/* Search overlay slider */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-50 flex flex-col justify-start">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            />

            {/* Panel */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="relative z-10 w-full bg-bg-secondary border-b border-border py-8 px-4 sm:px-6 lg:px-8 shadow-2xl"
            >
              <div className="mx-auto max-w-3xl">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div className="flex items-center gap-3 flex-1">
                    <Search size={22} className="text-text-muted shrink-0" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      placeholder="Search pants, dresses, tailoring, keywords..."
                      className="w-full text-lg sm:text-xl font-normal placeholder:text-text-muted/60 border-none bg-transparent outline-none focus:ring-0 text-text-primary caret-primary"
                    />
                  </div>
                  <button
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="p-2 text-text-muted hover:text-text-primary transition-colors focus:outline-none cursor-pointer rounded-full hover:bg-black/5"
                    aria-label="Close search"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Suggestions */}
                <div className="mt-4 flex flex-wrap gap-2 items-center text-xs">
                  <span className="text-text-muted font-semibold uppercase tracking-wider">Quick searches:</span>
                  {["Trench", "Knit", "Silk", "Pants"].map((keyword) => (
                    <button
                      key={keyword}
                      onClick={() => {
                        setSearchQuery(keyword);
                        if (location.pathname !== "/" && location.pathname !== "/products") {
                          navigate("/");
                        }
                      }}
                      className="px-3.5 py-1 rounded-full bg-bg-dark border border-border hover:border-primary hover:text-primary transition-colors cursor-pointer text-text-primary font-medium"
                    >
                      {keyword}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
