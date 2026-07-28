import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, Star, Heart, Check } from "lucide-react";

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist
}) {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Set default values when product changes
  useEffect(() => {
    if (product) {
      setSelectedImageIdx(0);
      setSelectedSize(product.sizes[0]);
      setSelectedColor(product.colors[0]);
      setQuantity(1);
    }
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedSize, selectedColor);
    onClose();
  };

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative z-50 w-full max-w-4xl overflow-hidden rounded-3xl bg-bg-secondary p-6 sm:p-8 shadow-2xl border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors text-text-light cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Content Grid */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Left Column: Product Gallery */}
              <div className="flex flex-col gap-4">
                {/* Main Image */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-bg-secondary border border-border">
                  <motion.img
                    key={selectedImageIdx}
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    src={product.images[selectedImageIdx]}
                    alt={product.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                {/* Thumbnails */}
                <div className="flex gap-3">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIdx(idx)}
                      className={`relative h-20 w-16 cursor-pointer overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                        selectedImageIdx === idx
                          ? "border-primary scale-102 ring-1 ring-primary"
                          : "border-transparent opacity-60 hover:opacity-100 hover:scale-105"
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Product Info & Selectors */}
              <div className="flex flex-col justify-between">
                <div>
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-text-muted font-semibold">
                      {product.category}
                    </span>
                    {product.isNew && (
                      <span className="rounded-full bg-primary px-3 py-0.5 text-[9px] font-bold tracking-wider text-bg-dark">
                        NEW ARRIVAL
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="mt-2 font-display text-3xl font-light text-text-light leading-tight">
                    {product.name}
                  </h2>

                  {/* Price & Rating */}
                  <div className="mt-3 flex items-center gap-6">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl font-semibold text-text-light">${product.price}</span>
                      {product.oldPrice && (
                        <span className="text-base text-text-muted line-through font-light">
                          ${product.oldPrice}
                        </span>
                      )}
                    </div>
                    <div className="h-4 w-[1px] bg-[var(--color-border)]" />
                    <div className="flex items-center gap-1.5">
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={15} fill="currentColor" />
                        ))}
                      </div>
                      <span className="text-xs text-text-muted font-medium">
                        {product.rating} ({product.reviewsCount} reviews)
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-5 text-sm font-light leading-relaxed text-text-muted">
                    {product.description}
                  </p>

                  <div className="h-[1px] w-full bg-[var(--color-border)] my-6" />

                  {/* Color Selector */}
                  <div className="mb-5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-text-light">
                      Color: <span className="font-light text-text-muted capitalize">{selectedColor?.name}</span>
                    </span>
                    <div className="mt-2 flex gap-3">
                      {product.colors.map((color) => {
                        const isSelected = selectedColor?.name === color.name;
                        return (
                          <button
                            key={color.name}
                            onClick={() => setSelectedColor(color)}
                            className="relative flex h-8 w-8 items-center justify-center rounded-full cursor-pointer focus:outline-none"
                            title={color.name}
                          >
                            <span
                              style={{ backgroundColor: color.hex }}
                              className="h-6 w-6 rounded-full border border-white/10 shadow-sm"
                            />
                            {isSelected && (
                              <motion.span
                                layoutId="activeColorOutline"
                                className="absolute inset-0 rounded-full border-2 border-text-light"
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Size Selector */}
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-text-light">
                      Select Size
                    </span>
                    <div className="mt-2.5 flex flex-wrap gap-2.5">
                      {product.sizes.map((size) => {
                        const isSelected = selectedSize === size;
                        return (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`relative px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer rounded-lg border ${
                              isSelected
                                ? "text-white border-text-light z-10"
                                : "text-text-light border-border hover:border-text-light"
                            }`}
                          >
                            {size}
                            {isSelected && (
                              <motion.div
                                layoutId="activeSizeBg"
                                className="absolute inset-0 -z-10 rounded-lg bg-text-light"
                                transition={{ type: "spring", stiffness: 350, damping: 28 }}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Footer Controls: Quantity & Action Buttons */}
                <div className="mt-8">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    {/* Quantity Stepper */}
                    <div className="flex h-12 items-center justify-between rounded-xl border border-border px-3 sm:w-32 bg-bg-secondary shadow-sm">
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        className="p-1 hover:text-primary transition-colors focus:outline-none cursor-pointer"
                        disabled={quantity <= 1}
                      >
                        <Minus size={15} />
                      </button>
                      <motion.span
                        key={quantity}
                        initial={{ scale: 0.8, y: -2 }}
                        animate={{ scale: 1, y: 0 }}
                        className="text-sm font-semibold text-text-light tabular-nums"
                      >
                        {quantity}
                      </motion.span>
                      <button
                        onClick={() => handleQuantityChange(1)}
                        className="p-1 hover:text-primary transition-colors focus:outline-none cursor-pointer"
                      >
                        <Plus size={15} />
                      </button>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 flex h-12 items-center justify-center gap-2 rounded-xl bg-primary text-xs font-semibold uppercase tracking-widest text-bg-dark shadow-md hover:bg-primary/90 transition-colors cursor-pointer"
                    >
                      <ShoppingBag size={15} />
                      Add to Cart
                    </button>

                    {/* Wishlist Button */}
                    <button
                      onClick={handleToggleWishlist}
                      className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300 focus:outline-none cursor-pointer ${
                        isWishlisted ? "text-primary border-primary bg-primary/10" : "text-text-primary border-border hover:border-primary hover:text-primary"
                      }`}
                    >
                      <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                    </button>
                  </div>

                  {/* Brand Taglines */}
                  <div className="mt-6 flex justify-around text-[10px] uppercase tracking-widest text-text-muted font-semibold border-t border-border/60 pt-5">
                    <span>Free Shipping</span>
                    <span className="text-[var(--color-border)]">•</span>
                    <span>14-day Returns</span>
                    <span className="text-[var(--color-border)]">•</span>
                    <span>Ethical Sourcing</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
