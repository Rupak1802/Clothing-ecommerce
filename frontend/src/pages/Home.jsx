import { useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS } from "../data/products";
import { useCart } from "../context/CartContext";

// Components
import Hero from "../components/Hero";
import Collections from "../components/Collections";
import ProductCard from "../components/ProductCard";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";

export default function Home() {
  const {
    activeFilter,
    setActiveFilter,
    searchQuery,
    setSearchQuery,
    wishlist,
    toggleWishlist,
    addToCart,
    openQuickView
  } = useCart();

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const productGridRef = useRef(null);

  // Sync query parameters with active filter
  useEffect(() => {
    const colParam = searchParams.get("collection");
    if (colParam) {
      setActiveFilter(colParam);
      // Remove query param to prevent sticky behavior, or keep it. Let's scroll to products grid
      setTimeout(() => {
        productGridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    }
  }, [searchParams, setActiveFilter]);

  const handleSelectCollection = (collectionId) => {
    setActiveFilter(collectionId);
    setSearchParams({ collection: collectionId });
    setTimeout(() => {
      productGridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  // Filter products
  const filteredProducts = PRODUCTS.filter((product) => {
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
    <div>
      {/* Hero Section */}
      {activeFilter === "all" && (
        <Hero
          onExploreClick={() => {
            productGridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        />
      )}

      {/* Collections Grid */}
      {activeFilter === "all" && (
        <Collections onSelectCollection={handleSelectCollection} />
      )}

      {/* Product Grid Section */}
      <main
        ref={productGridRef}
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 border-t border-[#e5e4e7]/60"
      >
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-accent text-2xl text-[#6F4E37] block mb-1">
              {activeFilter === "wishlist" ? "Curated Choice" : "The Studio Collection"}
            </span>
            <h2 className="font-display text-3xl font-light uppercase tracking-wide text-[#111111]">
              {activeFilter === "all" && "All Products"}
              {activeFilter === "tailoring" && "Minimalist Tailoring"}
              {activeFilter === "lounge" && "Knitwear & Lounge"}
              {activeFilter === "summer" && "Summer Editorial"}
              {activeFilter === "wishlist" && "My Wishlist"}
            </h2>
          </div>

          <div className="text-xs uppercase tracking-widest text-[#6b6375] font-semibold">
            Showing {filteredProducts.length} items
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl bg-white border border-[#e5e4e7] p-8 shadow-sm">
            <span className="text-4xl mb-4">🔍</span>
            <h3 className="font-display text-lg font-medium text-[#111111]">No pieces found</h3>
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
                  setSearchParams({});
                }}
                className="mt-6 rounded-lg bg-[#4B352A] hover:bg-[#6F4E37] px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white transition-colors cursor-pointer"
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
                    onToggleWishlist={toggleWishlist}
                    onAddToCart={addToCart}
                    onQuickView={(p) => navigate(`/product/${p.id}`)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>

      <Testimonials />
      <Newsletter />
    </div>
  );
}
