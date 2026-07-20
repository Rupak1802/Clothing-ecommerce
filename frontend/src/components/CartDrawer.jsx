import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react";

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) {
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const [displayTotal, setDisplayTotal] = useState(subtotal);

  // Smooth number-count animation for subtotal
  useEffect(() => {
    let start = displayTotal;
    const end = subtotal;
    if (start === end) return;

    const duration = 400; // ms
    const startTime = performance.now();
    let animationFrameId;

    const updateNumber = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress * (2 - progress); // Ease out quad
      const currentValue = Math.round(start + (end - start) * easeProgress);

      setDisplayTotal(currentValue);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateNumber);
      }
    };

    animationFrameId = requestAnimationFrame(updateNumber);
    return () => cancelAnimationFrame(animationFrameId);
  }, [subtotal]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#111111]"
          />

          {/* Drawer Wrapper */}
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="pointer-events-auto w-screen max-w-md bg-[#f9f6f0] shadow-2xl flex flex-col h-full border-l border-[#e5e4e7]"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#e5e4e7] p-6">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={20} className="text-[#111111]" />
                  <h2 className="font-display text-xl font-medium text-[#111111]">Your Cart</h2>
                  <span className="rounded-full bg-[#111111] px-2 py-0.5 text-xs text-white">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-[#111111] hover:text-[#ff2a74] transition-colors focus:outline-none cursor-pointer"
                  aria-label="Close cart"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Cart List */}
              <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
                <AnimatePresence initial={false}>
                  {cartItems.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="flex h-full flex-col items-center justify-center text-center"
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#111111]/5 text-[#6b6375] mb-4">
                        <ShoppingBag size={28} />
                      </div>
                      <h3 className="font-display text-lg font-medium text-[#111111]">Your cart is empty</h3>
                      <p className="mt-2 text-xs font-light text-[#6b6375] max-w-xs leading-relaxed">
                        Looks like you haven't added anything to your cart yet. Explore our latest drops.
                      </p>
                      <button
                        onClick={onClose}
                        className="mt-6 rounded-xl bg-[#111111] px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-white shadow-md hover:bg-[#ff2a74] transition-colors cursor-pointer"
                      >
                        Start Shopping
                      </button>
                    </motion.div>
                  ) : (
                    <div className="flex flex-col gap-5">
                      {cartItems.map((item, idx) => (
                        <motion.div
                          key={`${item.product.id}-${item.selectedSize}-${item.selectedColor?.name}`}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 50 }}
                          transition={{ duration: 0.3 }}
                          className="flex gap-4 rounded-xl border border-[#e5e4e7] bg-white p-3.5 shadow-sm"
                        >
                          {/* Image */}
                          <div className="relative aspect-[3/4] w-20 overflow-hidden rounded-lg bg-[#f5efe4] border border-[#e5e4e7] shrink-0">
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          {/* Info */}
                          <div className="flex flex-1 flex-col justify-between">
                            <div>
                              <div className="flex items-start justify-between gap-2">
                                <h3 className="font-display text-sm font-medium text-[#111111] line-clamp-1">
                                  {item.product.name}
                                </h3>
                                <button
                                  onClick={() => onRemoveItem(idx)}
                                  className="p-1 text-[#6b6375] hover:text-[#ff2a74] transition-colors cursor-pointer"
                                  title="Remove item"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                              {/* Attributes */}
                              <div className="mt-1 flex flex-wrap gap-2 text-[10px] text-[#6b6375] font-semibold uppercase tracking-wider">
                                {item.selectedSize && (
                                  <span className="rounded bg-[#f9f6f0] border border-[#e5e4e7] px-1.5 py-0.5">
                                    Size: {item.selectedSize}
                                  </span>
                                )}
                                {item.selectedColor && (
                                  <span className="flex items-center gap-1 rounded bg-[#f9f6f0] border border-[#e5e4e7] px-1.5 py-0.5">
                                    <span
                                      style={{ backgroundColor: item.selectedColor.hex }}
                                      className="h-2 w-2 rounded-full border border-black/10"
                                    />
                                    {item.selectedColor.name}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="mt-2.5 flex items-center justify-between">
                              {/* Quantity Stepper */}
                              <div className="flex items-center justify-between rounded-lg border border-[#e5e4e7] px-2 py-1 w-24 bg-white">
                                <button
                                  onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                                  className="text-[#6b6375] hover:text-[#ff2a74] focus:outline-none cursor-pointer"
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus size={11} />
                                </button>
                                <span className="text-xs font-semibold text-[#111111] tabular-nums">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                                  className="text-[#6b6375] hover:text-[#ff2a74] focus:outline-none cursor-pointer"
                                >
                                  <Plus size={11} />
                                </button>
                              </div>

                              <span className="text-sm font-semibold tracking-wide text-[#111111]">
                                ${item.product.price * item.quantity}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer Summary */}
              {cartItems.length > 0 && (
                <div className="border-t border-[#e5e4e7] bg-[#f9f6f0] p-6">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between text-xs tracking-wider text-[#6b6375] uppercase">
                      <span>Shipping</span>
                      <span className="font-semibold text-emerald-600">Calculated at Checkout</span>
                    </div>
                    <div className="flex items-baseline justify-between pt-2">
                      <span className="font-display text-base font-light text-[#111111]">Subtotal</span>
                      <span className="text-2xl font-bold text-[#111111] tracking-wide tabular-nums">
                        ${displayTotal}
                      </span>
                    </div>
                  </div>

                  <p className="mt-2 text-[10px] text-[#6b6375] font-light leading-relaxed">
                    Taxes and shipping calculated at checkout. Secure SSL payments provided.
                  </p>

                  <button
                    onClick={onCheckout}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#111111] py-3.5 text-xs font-semibold uppercase tracking-widest text-white shadow-md hover:bg-[#ff2a74] transition-colors cursor-pointer"
                  >
                    Proceed to Checkout
                    <ArrowRight size={14} />
                  </button>

                  <button
                    onClick={onClose}
                    className="mt-3 w-full text-center text-[10px] font-semibold uppercase tracking-widest text-[#6b6375] hover:text-[#111111] hover:underline transition-colors focus:outline-none"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
