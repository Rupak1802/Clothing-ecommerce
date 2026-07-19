import { useCart } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, ArrowRight } from "lucide-react";
import ProductCard from "../../components/ProductCard";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5F1E8] py-12 px-4 sm:px-6 lg:px-8 text-[#111111]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-light uppercase tracking-widest text-[#4B352A]">
              My Wishlist
            </h1>
            <p className="text-xs text-[#6D6D6D] font-light mt-1">
              Your curated premium selection of AURA pieces
            </p>
          </div>
          <Link
            to="/"
            className="self-start md:self-auto inline-flex items-center gap-2 rounded-xl bg-[#4B352A] hover:bg-[#6F4E37] px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-white transition-colors"
          >
            Explore More Items
            <ArrowRight size={14} />
          </Link>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#6F4E37]/10 p-8 shadow-sm">
            <Heart size={48} className="mx-auto text-[#6F4E37] opacity-60 mb-4 animate-pulse" />
            <h3 className="font-display text-lg font-medium text-[#111111]">Your wishlist is empty</h3>
            <p className="mt-2 text-xs font-light text-[#6D6D6D] max-w-xs mx-auto leading-relaxed">
              Tap the heart icon on any piece while browsing to save it to your wishlist.
            </p>
            <Link
              to="/"
              className="mt-6 inline-block rounded-xl bg-[#4B352A] px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-white hover:bg-[#6F4E37] transition-colors"
            >
              Shop Store
            </Link>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 bg-white rounded-3xl p-6 md:p-8 border border-[#6F4E37]/10 shadow-sm"
          >
            <AnimatePresence mode="popLayout">
              {wishlist.map((product) => (
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
                    isWishlisted={true}
                    onToggleWishlist={toggleWishlist}
                    onAddToCart={addToCart}
                    onQuickView={(p) => navigate(`/product/${p.id}`)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
