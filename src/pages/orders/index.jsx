import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Package, Calendar, Tag, CreditCard, ShoppingBag, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function OrdersPage() {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("aura_orders") || "[]");
    // Filter orders matching current customer email
    const userOrders = savedOrders.filter((o) => o.userEmail === currentUser.email);
    setOrders(userOrders);
  }, [currentUser]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Shipped":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Delivered":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] py-12 px-4 sm:px-6 lg:px-8 text-[#111111]">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-light uppercase tracking-widest text-[#4B352A]">
              My Orders
            </h1>
            <p className="text-xs text-[#6D6D6D] font-light mt-1">
              Track and review your purchases at AURA Studio
            </p>
          </div>
          <Link
            to="/"
            className="self-start md:self-auto inline-flex items-center gap-2 rounded-xl bg-[#4B352A] hover:bg-[#6F4E37] px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-white shadow-sm transition-colors"
          >
            Continue Browsing
            <ArrowRight size={14} />
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#6F4E37]/10 p-8 shadow-sm">
            <Package size={48} className="mx-auto text-[#6F4E37] opacity-60 mb-4" />
            <h3 className="font-display text-lg font-medium text-[#111111]">No purchases recorded</h3>
            <p className="mt-2 text-xs font-light text-[#6D6D6D] max-w-xs mx-auto leading-relaxed">
              You haven't placed any orders yet. Visit our Collections to select your wardrobe items.
            </p>
            <Link
              to="/"
              className="mt-6 inline-block rounded-xl bg-[#4B352A] hover:bg-[#6F4E37] px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-white transition-colors cursor-pointer"
            >
              Shop Collections
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-[#6F4E37]/10 rounded-2xl p-6 shadow-md transition-shadow hover:shadow-lg"
              >
                {/* Order Top Panel */}
                <div className="flex flex-wrap items-center justify-between pb-4 border-b border-black/5 gap-4">
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-[#F5F1E8] text-[#4B352A]">
                      <Package size={18} />
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-[#4B352A] uppercase tracking-wider">
                        {order.id}
                      </h4>
                      <div className="flex items-center gap-3 mt-0.5 text-[10px] text-[#6D6D6D] font-light">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {order.date}
                        </span>
                        <span>•</span>
                        <span>Total: ${order.total}</span>
                      </div>
                    </div>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>

                {/* Items in Order */}
                <div className="py-4 space-y-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-9 rounded overflow-hidden bg-[#F5F1E8]/40 border border-black/5 flex-shrink-0 flex items-center justify-center">
                          {/* Use fallback letter if image isn't available */}
                          <span className="text-[10px] text-[#6D6D6D] font-bold">
                            {item.name[0]}
                          </span>
                        </div>
                        <div>
                          <h5 className="text-xs font-semibold text-[#111111]">{item.name}</h5>
                          <p className="text-[10px] text-[#6D6D6D] mt-0.5 font-light">
                            Size: {item.size} | Color: {item.color?.name || "Default"} | Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-[#4B352A]">
                        ${item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Address summary & Payment mode */}
                <div className="pt-4 border-t border-black/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[10px] text-[#6D6D6D] font-light uppercase tracking-wider">
                  <div>
                    <span className="font-semibold text-[#4B352A]">Ship to: </span>
                    {order.shippingAddress?.fullName}, {order.shippingAddress?.address}, {order.shippingAddress?.city}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CreditCard size={14} className="text-[#556B2F]" />
                    <span>Card Transaction Verified</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
