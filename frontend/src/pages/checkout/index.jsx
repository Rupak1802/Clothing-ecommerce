import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, CreditCard, ArrowRight, User, MapPin, CheckCircle } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  const [placedOrderId, setPlacedOrderId] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      fullName: currentUser?.fullName || "",
      address: "",
      city: "",
      postalCode: "",
      country: "United States",
      cardName: currentUser?.fullName || "",
      cardNumber: "",
      expiry: "",
      cvv: ""
    }
  });

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = cartTotal > 300 ? 0 : 25;
  const totalAmount = cartTotal + shippingFee;

  const handleShippingSubmit = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    setStep(2);
  };

  const handlePlaceOrder = (data) => {
    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    
    // Process order placement
    const orderId = `AURA-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      id: orderId,
      userEmail: currentUser.email,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      }),
      items: cart.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        size: item.selectedSize,
        color: item.selectedColor
      })),
      subtotal: cartTotal,
      shipping: shippingFee,
      total: totalAmount,
      shippingAddress: {
        fullName: data.fullName,
        address: data.address,
        city: data.city,
        postalCode: data.postalCode,
        country: data.country
      },
      status: "Processing"
    };

    // Save to user orders list in localStorage
    const savedOrders = JSON.parse(localStorage.getItem("aura_orders") || "[]");
    localStorage.setItem("aura_orders", JSON.stringify([newOrder, ...savedOrders]));

    // Clear cart and complete checkout
    setPlacedOrderId(orderId);
    clearCart();
    setStep(3);
    toast.success("Order placed successfully!");
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-[#F5F1E8] py-20 px-4 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md bg-white border border-[#6F4E37]/15 p-10 rounded-2xl shadow-xl text-center"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#556B2F]/10 text-[#556B2F] mb-6">
            <CheckCircle size={36} />
          </div>
          <h2 className="font-display text-2xl font-light uppercase tracking-wide text-[#111111]">
            Purchase Complete!
          </h2>
          <p className="mt-4 text-xs font-light text-[#6D6D6D] leading-relaxed">
            Thank you for shopping at AURA. We have registered your order <strong className="text-[#4B352A]">{placedOrderId}</strong>. A receipt and tracking details will be sent shortly.
          </p>

          <div className="mt-8 space-y-3">
            <Link
              to="/orders"
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#4B352A] py-3 text-xs font-semibold uppercase tracking-widest text-[#4B352A] hover:bg-[#F5F1E8] transition-colors"
            >
              View Order History
            </Link>
            <Link
              to="/"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#4B352A] py-3 text-xs font-semibold uppercase tracking-widest text-white shadow-md hover:bg-[#6F4E37] transition-colors"
            >
              Continue Shopping
              <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F1E8] py-12 px-4 sm:px-6 lg:px-8 text-[#111111]">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-display text-3xl font-light uppercase tracking-widest text-[#4B352A] mb-8 text-center md:text-left">
          Checkout
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#6F4E37]/10 p-8 shadow-sm">
            <ShoppingBag size={48} className="mx-auto text-[#6F4E37] opacity-60 mb-4" />
            <h3 className="font-display text-xl font-medium text-[#111111]">Your cart is empty</h3>
            <p className="mt-2 text-xs font-light text-[#6D6D6D]">
              Explore our Collections and add items to your cart before checking out.
            </p>
            <Link
              to="/"
              className="mt-6 inline-block rounded-xl bg-[#4B352A] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white hover:bg-[#6F4E37] transition-colors cursor-pointer"
            >
              Return to Shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Section */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 md:p-8 border border-[#6F4E37]/10 shadow-md">
              {/* Stepper Header */}
              <div className="flex items-center gap-4 pb-6 border-b border-[#6F4E37]/10 mb-6">
                <span
                  className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    step === 1 ? "bg-[#4B352A] text-white" : "bg-[#556B2F] text-white"
                  }`}
                >
                  1
                </span>
                <span className={`text-xs font-semibold uppercase tracking-wider ${step === 1 ? "text-[#4B352A]" : "text-[#556B2F]"}`}>
                  Shipping
                </span>
                <div className="h-[1px] bg-[#6F4E37]/20 flex-1" />
                <span
                  className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    step === 2 ? "bg-[#4B352A] text-white" : "bg-[#6F4E37]/20 text-[#6D6D6D]"
                  }`}
                >
                  2
                </span>
                <span className={`text-xs font-semibold uppercase tracking-wider ${step === 2 ? "text-[#4B352A]" : "text-[#6D6D6D]"}`}>
                  Payment
                </span>
              </div>

              {step === 1 ? (
                <form onSubmit={handleSubmit(handleShippingSubmit)} className="space-y-4">
                  <div className="flex items-center gap-2 mb-4 text-[#4B352A]">
                    <User size={18} />
                    <h3 className="font-display text-sm font-semibold uppercase tracking-wider">
                      Shipping Destination
                    </h3>
                  </div>

                  <div>
                    <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#4B352A] mb-1">
                      Recipient Full Name
                    </label>
                    <input
                      type="text"
                      className="block w-full border border-[#6F4E37]/20 focus:border-[#4B352A] rounded-xl px-4 py-2.5 bg-[#F5F1E8]/20 outline-none text-xs"
                      placeholder="Elena Rostova"
                      {...register("fullName", { required: "Name is required" })}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#4B352A] mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      className="block w-full border border-[#6F4E37]/20 focus:border-[#4B352A] rounded-xl px-4 py-2.5 bg-[#F5F1E8]/20 outline-none text-xs"
                      placeholder="Apt, suite, or street address"
                      {...register("address", { required: "Address is required" })}
                    />
                    {errors.address && (
                      <p className="mt-1 text-xs text-red-600">{errors.address.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#4B352A] mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        className="block w-full border border-[#6F4E37]/20 focus:border-[#4B352A] rounded-xl px-4 py-2.5 bg-[#F5F1E8]/20 outline-none text-xs"
                        placeholder="New York"
                        {...register("city", { required: "City is required" })}
                      />
                      {errors.city && (
                        <p className="mt-1 text-xs text-red-600">{errors.city.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#4B352A] mb-1">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        className="block w-full border border-[#6F4E37]/20 focus:border-[#4B352A] rounded-xl px-4 py-2.5 bg-[#F5F1E8]/20 outline-none text-xs"
                        placeholder="10001"
                        {...register("postalCode", { required: "Postal Code is required" })}
                      />
                      {errors.postalCode && (
                        <p className="mt-1 text-xs text-red-600">{errors.postalCode.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#4B352A] mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      className="block w-full border border-[#6F4E37]/20 focus:border-[#4B352A] rounded-xl px-4 py-2.5 bg-[#F5F1E8]/20 outline-none text-xs"
                      {...register("country", { required: "Country is required" })}
                    />
                    {errors.country && (
                      <p className="mt-1 text-xs text-red-600">{errors.country.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#4B352A] hover:bg-[#6F4E37] py-3.5 text-xs font-semibold uppercase tracking-widest text-white shadow-md transition-colors cursor-pointer mt-6"
                  >
                    Proceed to Payment
                    <ArrowRight size={14} />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSubmit(handlePlaceOrder)} className="space-y-4">
                  <div className="flex items-center gap-2 mb-4 text-[#4B352A]">
                    <CreditCard size={18} />
                    <h3 className="font-display text-sm font-semibold uppercase tracking-wider">
                      Payment Verification
                    </h3>
                  </div>

                  <div>
                    <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#4B352A] mb-1">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      className="block w-full border border-[#6F4E37]/20 focus:border-[#4B352A] rounded-xl px-4 py-2.5 bg-[#F5F1E8]/20 outline-none text-xs"
                      placeholder="Elena Rostova"
                      {...register("cardName", { required: "Cardholder name is required" })}
                    />
                    {errors.cardName && (
                      <p className="mt-1 text-xs text-red-600">{errors.cardName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#4B352A] mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      className="block w-full border border-[#6F4E37]/20 focus:border-[#4B352A] rounded-xl px-4 py-2.5 bg-[#F5F1E8]/20 outline-none text-xs"
                      placeholder="4111 2222 3333 4444"
                      {...register("cardNumber", {
                        required: "Card number is required",
                        pattern: { value: /^[0-9\s-]{16,19}$/, message: "Invalid card number format" }
                      })}
                    />
                    {errors.cardNumber && (
                      <p className="mt-1 text-xs text-red-600">{errors.cardNumber.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#4B352A] mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        className="block w-full border border-[#6F4E37]/20 focus:border-[#4B352A] rounded-xl px-4 py-2.5 bg-[#F5F1E8]/20 outline-none text-xs"
                        placeholder="MM/YY"
                        {...register("expiry", {
                          required: "Required",
                          pattern: { value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/, message: "Use MM/YY format" }
                        })}
                      />
                      {errors.expiry && (
                        <p className="mt-1 text-xs text-red-600">{errors.expiry.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#4B352A] mb-1">
                        CVV Code
                      </label>
                      <input
                        type="password"
                        maxLength="4"
                        className="block w-full border border-[#6F4E37]/20 focus:border-[#4B352A] rounded-xl px-4 py-2.5 bg-[#F5F1E8]/20 outline-none text-xs"
                        placeholder="•••"
                        {...register("cvv", {
                          required: "Required",
                          pattern: { value: /^[0-9]{3,4}$/, message: "3 or 4 digits" }
                        })}
                      />
                      {errors.cvv && (
                        <p className="mt-1 text-xs text-red-600">{errors.cvv.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 rounded-xl border border-[#6F4E37]/20 hover:border-[#4B352A] py-3.5 text-xs font-semibold uppercase tracking-widest text-[#4B352A] transition-colors cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 rounded-xl bg-[#556B2F] hover:bg-[#7A8F52] py-3.5 text-xs font-semibold uppercase tracking-widest text-white shadow-md transition-colors cursor-pointer"
                    >
                      Place Order
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-[#6F4E37]/10 shadow-md">
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-[#4B352A] mb-4 border-b border-[#6F4E37]/10 pb-3">
                Order Items ({cart.length})
              </h3>

              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex gap-4 pb-4 border-b border-black/5 last:border-b-0">
                    <div className="h-16 w-12 rounded-lg overflow-hidden bg-[#F5F1E8]/40 border border-black/5 flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-medium text-[#111111] truncate">{item.product.name}</h4>
                      <p className="text-[10px] text-[#6D6D6D] mt-0.5 font-light">
                        Qty: {item.quantity} | Size: {item.selectedSize} | {item.selectedColor.name}
                      </p>
                      <p className="text-xs font-semibold text-[#4B352A] mt-1">
                        ${item.product.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Calculation */}
              <div className="border-t border-[#6F4E37]/10 pt-4 mt-6 space-y-2 text-xs">
                <div className="flex justify-between text-[#6D6D6D]">
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-[#6D6D6D]">
                  <span>Shipping</span>
                  <span>{shippingFee === 0 ? "Complimentary" : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-[#111111] font-semibold text-sm border-t border-black/5 pt-2 mt-2">
                  <span>Total Amount</span>
                  <span className="text-[#4B352A]">₹{totalAmount}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
