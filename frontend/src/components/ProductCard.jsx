import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Eye } from "lucide-react";

export default function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onQuickView
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [image1Loaded, setImage1Loaded] = useState(false);

  const calculateDiscount = (price, oldPrice) => {
    if (!oldPrice) return null;
    return Math.round(((oldPrice - price) / oldPrice) * 100);
  };

  const discountPercent = calculateDiscount(product.price, product.oldPrice);

  return (
    <motion.div
      layout
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-[#e5e4e7] p-3 transition-all duration-300 hover:shadow-lg"
    >
      {/* Image Gallery Panel */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#f5efe4]">
        {/* Shimmer skeleton */}
        {!image1Loaded && (
          <div className="absolute inset-0 z-20 shimmer-bg" />
        )}

        {/* Front Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          onLoad={() => setImage1Loaded(true)}
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-100"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {product.badge && (
            <span
              className={`rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm ${
                product.badge === "SALE" ? "bg-[#ff2a74]" : "bg-[#111111]"
              }`}
            >
              {product.badge}
            </span>
          )}
          {discountPercent && (
            <span className="font-accent rounded-full bg-[#f9f6f0] border border-[#ff2a74] text-[#ff2a74] px-2.5 py-0.5 text-xs font-bold leading-none shadow-sm rotate-[-3deg]">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Icon */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.85 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className={`absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition-colors cursor-pointer ${
            isWishlisted ? "text-[#ff2a74]" : "text-[#111111] hover:text-[#ff2a74]"
          }`}
        >
          <Heart size={18} fill={isWishlisted ? "#ff2a74" : "none"} />
        </motion.button>

        {/* Quick View trigger */}
        <button
          onClick={() => onQuickView(product)}
          className="absolute right-3 bottom-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md opacity-0 scale-90 translate-y-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-300 hover:text-[#ff2a74] cursor-pointer"
          title="Quick View"
        >
          <Eye size={18} />
        </button>

        {/* Add to Cart Slider Panel */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-3 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out hidden sm:block">
          <motion.button
            onClick={() => onAddToCart(product)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#111111] py-2.5 text-xs font-semibold uppercase tracking-widest text-white shadow-md hover:bg-[#ff2a74] transition-colors cursor-pointer"
          >
            <ShoppingBag size={14} />
            Quick Add
          </motion.button>
        </div>
      </div>

      {/* Mobile Add to Cart Trigger */}
      <div className="mt-3 block sm:hidden">
        <button
          onClick={() => onAddToCart(product)}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#111111] py-2 text-xs font-semibold uppercase tracking-widest text-white transition-colors"
        >
          <ShoppingBag size={13} />
          Add to Cart
        </button>
      </div>

      {/* Product Details */}
      <div className="mt-4 flex flex-1 flex-col justify-between">
        <div className="cursor-pointer" onClick={() => onQuickView(product)}>
          <span className="text-[10px] uppercase tracking-wider text-[#6b6375]">
            {product.category}
          </span>
          <h3 className="mt-1 font-display text-base font-medium text-[#111111] group-hover:text-[#ff2a74] transition-colors leading-snug">
            {product.name}
          </h3>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold tracking-wide text-[#111111]">
              ${product.price}
            </span>
            {product.oldPrice && (
              <span className="text-xs font-light text-[#6b6375] line-through">
                ${product.oldPrice}
              </span>
            )}
          </div>

          <div className="flex gap-1">
            {product.colors.map((color, i) => (
              <span
                key={i}
                style={{ backgroundColor: color.hex }}
                className="h-2.5 w-2.5 rounded-full border border-black/10"
                title={color.name}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
