import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../../data/products";
import {
  ShoppingBag,
  ListOrdered,
  Users,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Plus,
  ArrowRight
} from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    customers: 0,
    revenue: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    // Products count
    const adminProducts = JSON.parse(localStorage.getItem("aura_admin_products") || "[]");
    const totalProducts = PRODUCTS.length + adminProducts.length;

    // Orders details
    const storedOrders = JSON.parse(localStorage.getItem("aura_orders") || "[]");
    const totalOrders = storedOrders.length;
    const totalRevenue = storedOrders.reduce((sum, o) => sum + o.total, 0);

    // Customers count
    const storedUsers = JSON.parse(localStorage.getItem("aura_users") || "[]");
    const totalCustomers = storedUsers.filter((u) => u.role === "customer").length;

    setStats({
      products: totalProducts,
      orders: totalOrders,
      customers: totalCustomers,
      revenue: totalRevenue
    });

    setRecentOrders(storedOrders.slice(0, 5));
  }, []);

  const getStatusBadge = (status) => {
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

  const kpis = [
    { label: "Total Products", value: stats.products, icon: ShoppingBag, color: "text-[#6F4E37] bg-[#6F4E37]/10" },
    { label: "Total Orders", value: stats.orders, icon: ListOrdered, color: "text-[#556B2F] bg-[#556B2F]/10" },
    { label: "Total Customers", value: stats.customers, icon: Users, color: "text-[#4B352A] bg-[#4B352A]/10" },
    { label: "Total Revenue", value: `₹${stats.revenue}`, icon: DollarSign, color: "text-[#7A8F52] bg-[#7A8F52]/10" }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#6F4E37]/10 shadow-sm">
        <div>
          <h2 className="font-display text-2xl font-light uppercase tracking-wider text-[#4B352A]">
            Overview Dashboard
          </h2>
          <p className="text-xs text-[#6D6D6D] font-light mt-0.5">
            System overview and quick control desk updates
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            to="/admin/products"
            className="inline-flex items-center gap-2 rounded-xl bg-[#556B2F] hover:bg-[#7A8F52] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-colors"
          >
            <Plus size={14} />
            Add Product
          </Link>
          <Link
            to="/admin/orders"
            className="inline-flex items-center gap-2 rounded-xl border border-[#6F4E37]/20 hover:border-[#4B352A] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#4B352A] hover:bg-[#F5F1E8]/40 transition-colors"
          >
            Manage Orders
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl border border-[#6F4E37]/10 shadow-sm flex items-center justify-between"
          >
            <div>
              <p className="text-[10px] uppercase tracking-wider text-[#6D6D6D] font-semibold">
                {kpi.label}
              </p>
              <h3 className="text-2xl font-bold text-[#4B352A] mt-1">{kpi.value}</h3>
            </div>
            <div className={`p-3.5 rounded-xl ${kpi.color}`}>
              <kpi.icon size={22} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Orders Table */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#6F4E37]/10 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-black/5 mb-4">
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-[#4B352A]">
                Recent Orders
              </h3>
              <Link
                to="/admin/orders"
                className="text-[10px] font-bold uppercase tracking-wider text-[#6F4E37] hover:underline flex items-center gap-1"
              >
                View all orders
                <ArrowRight size={12} />
              </Link>
            </div>

            {recentOrders.length === 0 ? (
              <p className="text-xs text-[#6D6D6D] font-light py-6 text-center">
                No orders placed in the system yet.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-wider text-[#6D6D6D] border-b border-black/5">
                      <th className="py-2.5 font-semibold">ID</th>
                      <th className="py-2.5 font-semibold">Customer</th>
                      <th className="py-2.5 font-semibold">Total</th>
                      <th className="py-2.5 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((o) => (
                      <tr key={o.id} className="border-b border-black/5 last:border-0 hover:bg-[#F5F1E8]/20">
                        <td className="py-3 font-semibold text-[#4B352A] uppercase">{o.id}</td>
                        <td className="py-3 font-light text-[#6D6D6D]">{o.shippingAddress?.fullName}</td>
                        <td className="py-3 font-semibold text-[#111111]">₹{o.total}</td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide border ${getStatusBadge(o.status)}`}>
                            {o.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Low Stock & System Info */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-[#6F4E37]/10 p-6 shadow-sm">
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-[#4B352A] pb-4 border-b border-black/5 mb-4 flex items-center gap-2">
            <AlertCircle size={16} className="text-[#6F4E37]" />
            Low Stock Alert
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-black/5">
              <div>
                <h4 className="text-xs font-semibold text-[#111111]">THUKIL Trench Coat</h4>
                <p className="text-[9px] text-[#6D6D6D] uppercase tracking-wider font-light mt-0.5">Size: XS | Oatmeal</p>
              </div>
              <span className="px-2 py-0.5 bg-red-100 text-red-800 border border-red-200 rounded text-[9px] font-bold">
                1 Left
              </span>
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-black/5">
              <div>
                <h4 className="text-xs font-semibold text-[#111111]">Tailored Pleated Trousers</h4>
                <p className="text-[9px] text-[#6D6D6D] uppercase tracking-wider font-light mt-0.5">Size: S | Olive Green</p>
              </div>
              <span className="px-2 py-0.5 bg-red-100 text-red-800 border border-red-200 rounded text-[9px] font-bold">
                2 Left
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-semibold text-[#111111]">Black Satin Slip Dress</h4>
                <p className="text-[9px] text-[#6D6D6D] uppercase tracking-wider font-light mt-0.5">Size: M | Black Satin</p>
              </div>
              <span className="px-2 py-0.5 bg-amber-100 text-amber-800 border border-amber-200 rounded text-[9px] font-bold">
                4 Left
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
