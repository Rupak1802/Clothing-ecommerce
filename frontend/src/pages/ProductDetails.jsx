import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, ArrowLeft, Star, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { PRODUCTS } from "../data/products";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    // Find in static list first
    let found = PRODUCTS.find((p) => p.id === id);
    
    // Fallback to local storage admin products
    if (!found) {
      const adminProducts = JSON.parse(localStorage.getItem("aura_admin_products") || "[]");
      found = adminProducts.find((p) => p.id === id);
    }

    if (found) {
      setProduct(found);
      setSelectedSize(found.sizes[0] || "M");
      setSelectedColor(found.colors[0] || { name: "Default", hex: "var(--color-text-light)" });
      setActiveImageIdx(0);
    } else {
      toast.error("Product not found");
      navigate("/");
    }
  }, [id, navigate]);

  if (!product) {
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)]" />
      </div>
    );
  }

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const handleAddToCartClick = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    toast.success(`${product.name} added to cart.`);
  };

  return (
    <div className="min-h-screen bg-bg-dark py-6 sm:py-12 px-4 sm:px-6 lg:px-8 text-text-light">
      <div className="max-w-7xl mx-auto">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)] hover:text-[var(--color-border)] mb-6 sm:mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Collections
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-bg-secondary rounded-3xl p-4 sm:p-6 md:p-10 border border-border/10 shadow-lg">
          {/* Gallery View */}
          <div className="flex flex-col gap-4">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-bg-secondary relative border border-border/10">
              {product.badge && (
                <span className="absolute top-4 left-4 z-10 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-primary text-white shadow-sm">
                  {product.badge}
                </span>
              )}
              <img
                src={product.images[activeImageIdx]}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Thumbnail selector */}
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative flex-shrink-0 w-20 h-24 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIdx === idx ? "border-[var(--color-primary)]" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between py-2">
            <div>
              <span className="text-xs uppercase tracking-widest text-[var(--color-border)] font-semibold">
                {product.category}
              </span>
              <h1 className="mt-1 md:mt-2 font-display text-2xl md:text-3xl font-light uppercase tracking-wide text-text-light">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center text-[#7A8F52]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                      className="text-[#7A8F52]"
                    />
                  ))}
                  <span className="text-xs font-semibold text-text-light ml-2 mt-0.5">
                    {product.rating}
                  </span>
                </div>
                <span className="text-xs text-[#6D6D6D] border-l border-white/10 pl-4">
                  {product.reviewsCount} Editorial Reviews
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 md:gap-4 mt-4 md:mt-6">
                <span className="text-2xl font-bold text-[var(--color-primary)]">₹{product.price}</span>
                {product.oldPrice && (
                  <span className="text-sm text-[#6D6D6D] line-through font-light">
                    ${product.oldPrice}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="mt-6 text-xs text-[#6D6D6D] font-light leading-relaxed">
                {product.description}
              </p>

              {/* Size Select */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-primary)]">
                    Select Size
                  </span>
                  <span className="text-[10px] text-[#6D6D6D] underline cursor-pointer">
                    Size Guide
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-11 w-14 flex items-center justify-center rounded-xl border text-xs font-semibold uppercase transition-all cursor-pointer ${
                        selectedSize === size
                          ? "border-[var(--color-primary)] bg-primary text-white shadow-sm"
                          : "border-border/20 hover:border-[var(--color-primary)] text-text-light"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Select */}
              <div className="mt-6">
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-[var(--color-primary)] mb-3">
                  Select Color: <span className="font-light normal-case text-xs text-[#6D6D6D] ml-1">{selectedColor?.name}</span>
                </span>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      style={{ backgroundColor: color.hex }}
                      className={`h-7 w-7 rounded-full border transition-all cursor-pointer ${
                        selectedColor?.name === color.name
                          ? "ring-2 ring-offset-2 ring-[var(--color-primary)] scale-110"
                          : "border-white/10 hover:scale-105"
                      }`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 md:mt-10 border-t border-border/10 pt-6">
              <div className="flex flex-wrap sm:flex-nowrap gap-3 sm:gap-4">
                <div className="flex gap-3 sm:gap-4 w-full sm:w-auto">
                  {/* Quantity */}
                  <div className="flex-1 sm:flex-none flex items-center justify-between sm:justify-center border border-border/20 rounded-xl h-12 px-4 sm:px-2 bg-bg-dark/30">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2 font-bold text-lg hover:opacity-70 focus:outline-none cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-2 font-bold text-lg hover:opacity-70 focus:outline-none cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  {/* Wishlist toggle */}
                  <button
                    onClick={() => {
                      toggleWishlist(product);
                      toast.success(isWishlisted ? "Removed from wishlist." : "Added to wishlist.");
                    }}
                    className={`h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-xl border transition-all cursor-pointer ${
                      isWishlisted
                        ? "border-primary text-primary"
                        : "border-border/20 text-text-light hover:border-[var(--color-primary)]"
                    }`}
                  >
                    <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCartClick}
                  className="w-full sm:flex-1 h-12 bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2 rounded-xl text-xs font-semibold uppercase tracking-widest shadow-md transition-colors cursor-pointer"
                >
                  <ShoppingBag size={16} />
                  Add to Bag
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-4 mt-8 text-center text-[10px] uppercase tracking-wider text-[#6D6D6D]">
                <div className="flex flex-col items-center gap-1.5 p-2 bg-bg-dark/40 rounded-xl border border-border/5">
                  <Truck size={16} className="text-[var(--color-border)]" />
                  <span>Complimentary Shipping</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-2 bg-bg-dark/40 rounded-xl border border-border/5">
                  <ShieldCheck size={16} className="text-[#556B2F]" />
                  <span>100% Genuine</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-2 bg-bg-dark/40 rounded-xl border border-border/5">
                  <RefreshCw size={16} className="text-[var(--color-primary)]" />
                  <span>Easy Exchange</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
