import { useState, useEffect } from "react";
import { ListOrdered, Eye, Edit, Save, X } from "lucide-react";
import { toast } from "react-toastify";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [statusVal, setStatusVal] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    const saved = JSON.parse(localStorage.getItem("aura_orders") || "[]");
    setOrders(saved);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Processing":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Shipped":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Delivered":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleStartEdit = (order) => {
    setEditingOrderId(order.id);
    setStatusVal(order.status);
  };

  const handleSaveStatus = (id) => {
    const updated = orders.map((o) => {
      if (o.id === id) {
        return { ...o, status: statusVal };
      }
      return o;
    });

    localStorage.setItem("aura_orders", JSON.stringify(updated));
    setOrders(updated);
    setEditingOrderId(null);
    toast.success("Order status updated successfully.");
  };

  return (
    <div className="space-y-6">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#6F4E37]/10 shadow-sm">
        <div>
          <h2 className="font-display text-xl font-light uppercase tracking-wider text-[#4B352A]">
            Order Management
          </h2>
          <p className="text-xs text-[#6D6D6D] font-light mt-0.5">
            Track customer deliveries and update processing states
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#4B352A]/10 border border-[#4B352A]/20 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#4B352A]">
          <ListOrdered size={14} />
          Active Orders: {orders.length}
        </div>
      </div>

      {/* Orders List Table */}
      <div className="bg-white rounded-2xl border border-[#6F4E37]/10 p-6 shadow-sm">
        {orders.length === 0 ? (
          <p className="text-xs text-[#6D6D6D] font-light py-10 text-center">
            No orders have been submitted to the platform yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="text-[10px] uppercase tracking-wider text-[#6D6D6D] border-b border-black/5">
                  <th className="py-3 font-semibold">Order ID</th>
                  <th className="py-3 font-semibold">Date</th>
                  <th className="py-3 font-semibold">Customer</th>
                  <th className="py-3 font-semibold">Total Amount</th>
                  <th className="py-3 font-semibold">Status</th>
                  <th className="py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-black/5 last:border-0 hover:bg-[#F5F1E8]/20">
                    <td className="py-3 font-semibold text-[#4B352A] uppercase">{o.id}</td>
                    <td className="py-3 font-light text-[#6D6D6D]">{o.date}</td>
                    <td className="py-3 font-medium text-[#111111]">{o.shippingAddress?.fullName}</td>
                    <td className="py-3 font-semibold text-[#4B352A]">₹{o.total}</td>
                    <td className="py-3">
                      {editingOrderId === o.id ? (
                        <select
                          value={statusVal}
                          onChange={(e) => setStatusVal(e.target.value)}
                          className="border border-[#6F4E37]/30 rounded px-2 py-1 bg-white outline-none"
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      ) : (
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${getStatusClass(o.status)}`}>
                          {o.status}
                        </span>
                      )}
                    </td>
                    <td className="py-3 text-right space-x-2">
                      {editingOrderId === o.id ? (
                        <>
                          <button
                            onClick={() => handleSaveStatus(o.id)}
                            className="p-1 rounded bg-[#556B2F] text-white hover:opacity-85 inline-flex items-center cursor-pointer"
                            title="Save"
                          >
                            <Save size={12} />
                          </button>
                          <button
                            onClick={() => setEditingOrderId(null)}
                            className="p-1 rounded bg-gray-200 text-gray-700 hover:opacity-85 inline-flex items-center cursor-pointer"
                            title="Cancel"
                          >
                            <X size={12} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => setSelectedOrder(o)}
                            className="p-1.5 rounded-lg text-[#4B352A] hover:bg-[#4B352A]/10 inline-flex items-center cursor-pointer"
                            title="Quick View"
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            onClick={() => handleStartEdit(o)}
                            className="p-1.5 rounded-lg text-[#556B2F] hover:bg-[#556B2F]/10 inline-flex items-center cursor-pointer"
                            title="Change Status"
                          >
                            <Edit size={14} />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick View Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl w-full max-w-md border border-[#6F4E37]/15 p-6 shadow-2xl relative text-[#111111]">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 text-[#6D6D6D] hover:opacity-85"
            >
              <X size={20} />
            </button>

            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-[#4B352A] mb-4 border-b border-black/5 pb-2">
              Order Details: {selectedOrder.id}
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <p className="font-semibold text-[#4B352A] uppercase text-[9px] tracking-wider mb-1">Shipping Target</p>
                <p className="text-[#6D6D6D] font-light">
                  {selectedOrder.shippingAddress?.fullName}<br />
                  {selectedOrder.shippingAddress?.address}, {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.postalCode}, {selectedOrder.shippingAddress?.country}
                </p>
              </div>

              <div>
                <p className="font-semibold text-[#4B352A] uppercase text-[9px] tracking-wider mb-2">Order Items</p>
                <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between border-b border-black/5 pb-1">
                      <div>
                        <span className="font-medium text-[#111111]">{item.name}</span>
                        <span className="text-[10px] text-[#6D6D6D] ml-2">({item.size} / {item.color?.name || "Default"})</span>
                      </div>
                      <span className="font-semibold text-[#4B352A]">x{item.quantity} - ₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-black/5 pt-2 flex justify-between font-semibold text-[#111111]">
                <span>Total Amount paid</span>
                <span className="text-[#4B352A]">₹{selectedOrder.total}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
