import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ShoppingBag, CreditCard, ArrowRight, Heart } from "lucide-react";
import { PRODUCTS } from "./data/products";

// Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Collections from "./components/Collections";
import ProductCard from "./components/ProductCard";
import QuickViewModal from "./components/QuickViewModal";
import CartDrawer from "./components/CartDrawer";
import Testimonials from "./components/Testimonials";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";

export default function App() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  // Quick view state
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const productGridRef = useRef(null);
  const searchInputRef = useRef(null);

  // Focus search input when search overlay opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current.focus(), 100);
    }
  }, [searchOpen]);

  // Scroll to products grid helper
  const scrollToProducts = () => {
    if (productGridRef.current) {
      productGridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSelectCollection = (collectionId) => {
    setActiveFilter(collectionId);
    setTimeout(scrollToProducts, 100);
  };

  // Add item to cart
  const handleAddToCart = (product, quantity = 1, size = "", color = null) => {
    // If size/color aren't passed (from Quick Add button), pick defaults
    const selectedSize = size || product.sizes[0] || "M";
    const selectedColor = color || product.colors[0] || { name: "Default", hex: "#111111" };

    setCart((prevCart) => {
      // Check if item already exists in cart with same size and color
      const existingIdx = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor.name === selectedColor.name
      );

      if (existingIdx > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingIdx].quantity += quantity;
        return updatedCart;
      } else {
        return [...prevCart, { product, quantity, selectedSize, selectedColor }];
      }
    });

    // Auto open cart drawer
    setCartOpen(true);
  };

  // Update cart item quantity
  const handleUpdateCartQuantity = (index, quantity) => {
    if (quantity <= 0) {
      handleRemoveCartItem(index);
      return;
    }
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      updatedCart[index].quantity = quantity;
      return updatedCart;
    });
  };

  // Remove item from cart
  const handleRemoveCartItem = (index) => {
    setCart((prevCart) => prevCart.filter((_, idx) => idx !== index));
  };

  // Toggle wishlist item
  const handleToggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some((item) => item.id === product.id);
      if (exists) {
        return prevWishlist.filter((item) => item.id !== product.id);
      } else {
        return [...prevWishlist, product];
      }
    });
  };

  // Open quick view modal
  const handleOpenQuickView = (product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  // Simulate Checkout
  const handleCheckout = () => {
    setCartOpen(false);
    setCheckoutSuccess(true);
    // Clear cart after checkout
    setTimeout(() => {
      setCart([]);
    }, 500);
  };

  // Total items in cart
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Filter products based on search & category
  const filteredProducts = PRODUCTS.filter((product) => {
    // Search query match
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeFilter === "wishlist") {
      const isWishlisted = wishlist.some((item) => item.id === product.id);
      return isWishlisted && matchesSearch;
    }

    if (activeFilter !== "all") {
      return product.collection === activeFilter && matchesSearch;
    }

    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f9f6f0] text-[#111111] antialiased">
      {/* Sticky Header */}
      <Navbar
        cartCount={cartItemsCount}
        wishlistCount={wishlist.length}
        onCartClick={() => setCartOpen(true)}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        onSearchOpen={() => setSearchOpen(true)}
        cartItemsCount={cartItemsCount}
      />

      {/* Hero Section */}
      {activeFilter === "all" && <Hero onExploreClick={scrollToProducts} />}

      {/* Collections grid (shown only on main 'all' feed) */}
      {activeFilter === "all" && (
        <Collections onSelectCollection={handleSelectCollection} />
      )}

      {/* Product Grid Section */}
      <main
        ref={productGridRef}
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 border-t border-[#e5e4e7]/60"
      >
        {/* Section title & pill indicators */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-accent text-2xl text-[#ff2a74] block mb-1">
              {activeFilter === "wishlist" ? "Curated Choice" : "The Studio Collection"}
            </span>
            <h2 className="font-display text-3xl font-light uppercase tracking-wide">
              {activeFilter === "all" && "All Products"}
              {activeFilter === "tailoring" && "Minimalist Tailoring"}
              {activeFilter === "lounge" && "Knitwear & Lounge"}
              {activeFilter === "summer" && "Summer Editorial"}
              {activeFilter === "wishlist" && "My Wishlist"}
            </h2>
          </div>

          {/* Quick filter display */}
          <div className="text-xs uppercase tracking-widest text-[#6b6375] font-semibold">
            Showing {filteredProducts.length} items
          </div>
        </div>

        {/* Product Grid layout */}
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl bg-white border border-[#e5e4e7] p-8 shadow-sm">
            <span className="text-4xl mb-4">🔍</span>
            <h3 className="font-display text-lg font-medium">No pieces found</h3>
            <p className="mt-2 text-xs font-light text-[#6b6375] max-w-xs leading-relaxed">
              {activeFilter === "wishlist"
                ? "Your wishlist is empty. Tap the heart icons on product cards to add your favorite items here."
                : "No matching pieces match your filter or search criteria. Try resetting filters."}
            </p>
            {activeFilter !== "all" && (
              <button
                onClick={() => {
                  setActiveFilter("all");
                  setSearchQuery("");
                }}
                className="mt-6 rounded-lg bg-[#111111] px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white hover:bg-[#ff2a74] transition-colors"
              >
                Reset Filters
              </button>
            )}
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard
                    product={product}
                    isWishlisted={wishlist.some((item) => item.id === product.id)}
                    onToggleWishlist={handleToggleWishlist}
                    onAddToCart={handleAddToCart}
                    onQuickView={handleOpenQuickView}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>

      {/* Customer reviews marquee */}
      <Testimonials />

      {/* Newsletter */}
      <Newsletter />

      {/* Footer */}
      <Footer setActiveFilter={handleSelectCollection} />

      {/* Quick View Modal Overlay */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        onAddToCart={handleAddToCart}
        isWishlisted={
          quickViewProduct ? wishlist.some((item) => item.id === quickViewProduct.id) : false
        }
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Cart Drawer Panel */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={handleCheckout}
      />

      {/* Search overlay slider (Top Drawer) */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-50 flex flex-col justify-start">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(false)}
              className="absolute inset-0 bg-[#111111]"
            />

            {/* Panel */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="relative z-10 w-full bg-[#f9f6f0] border-b border-[#e5e4e7] py-8 px-4 sm:px-6 lg:px-8 shadow-2xl"
            >
              <div className="mx-auto max-w-3xl">
                <div className="flex items-center justify-between pb-4 border-b border-[#111111]">
                  <div className="flex items-center gap-3 flex-1">
                    <Search size={22} className="text-[#6b6375]" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search pants, dresses, tailoring, keywords..."
                      className="w-full text-lg sm:text-xl font-light placeholder-black/30 border-none bg-transparent outline-none focus:ring-0"
                    />
                  </div>
                  <button
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="p-2 text-[#111111] hover:opacity-75 focus:outline-none cursor-pointer"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Instant Search Suggestions */}
                <div className="mt-4 flex flex-wrap gap-2 items-center text-xs">
                  <span className="text-[#6b6375] font-semibold uppercase tracking-wider">Quick searches:</span>
                  {["Trench", "Knit", "Silk", "Pants", "Sale"].map((keyword) => (
                    <button
                      key={keyword}
                      onClick={() => setSearchQuery(keyword)}
                      className="px-3 py-1 rounded-full bg-white border border-[#e5e4e7] hover:border-[#ff2a74] transition-colors"
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

      {/* Checkout Success Confirmation Modal */}
      <AnimatePresence>
        {checkoutSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#111111]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl bg-white border border-[#e5e4e7] p-8 text-center shadow-2xl"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-6">
                <CreditCard size={28} />
              </div>
              <h3 className="font-display text-xl font-medium text-[#111111]">
                Purchase Complete!
              </h3>
              <p className="mt-3 text-xs font-light text-[#6b6375] leading-relaxed">
                Thank you for shopping at AURA. We have processed your order and sent a receipt with tracking details to your registered email address.
              </p>
              <button
                onClick={() => setCheckoutSuccess(false)}
                className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-[#111111] py-3 text-xs font-semibold uppercase tracking-widest text-white shadow-md hover:bg-[#ff2a74] transition-colors cursor-pointer"
              >
                Back to Store
                <ArrowRight size={14} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
