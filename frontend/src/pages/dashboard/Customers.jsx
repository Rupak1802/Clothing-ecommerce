import { useState, useEffect } from "react";
import { Users, Mail, Phone, Calendar } from "lucide-react";

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Load registered users
    const users = JSON.parse(localStorage.getItem("aura_users") || "[]");
    const customerUsers = users.filter((u) => u.role === "customer");

    // Load orders to calculate stats
    const orders = JSON.parse(localStorage.getItem("aura_orders") || "[]");

    const customersWithStats = customerUsers.map((cust) => {
      const custOrders = orders.filter((o) => o.userEmail === cust.email);
      const ordersCount = custOrders.length;
      const totalSpend = custOrders.reduce((sum, o) => sum + o.total, 0);
      return {
        ...cust,
        ordersCount,
        totalSpend
      };
    });

    setCustomers(customersWithStats);
  }, []);

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-bg-secondary p-6 rounded-2xl border border-border/10 shadow-sm">
        <div>
          <h2 className="font-display text-xl font-light uppercase tracking-wider text-[var(--color-primary)]">
            Customers Directory
          </h2>
          <p className="text-xs text-[#6D6D6D] font-light mt-0.5">
            Review registered buyer credentials and total checkout values
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#556B2F]/10 border border-[#556B2F]/20 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#556B2F]">
          <Users size={14} />
          Members: {customers.length}
        </div>
      </div>

      {/* Directory Table */}
      <div className="bg-bg-secondary rounded-2xl border border-border/10 p-6 shadow-sm">
        {customers.length === 0 ? (
          <p className="text-xs text-[#6D6D6D] font-light py-10 text-center">
            No customer accounts registered in the database yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="text-[10px] uppercase tracking-wider text-[#6D6D6D] border-b border-white/10">
                  <th className="py-3 font-semibold">Name</th>
                  <th className="py-3 font-semibold">Email</th>
                  <th className="py-3 font-semibold">Phone</th>
                  <th className="py-3 font-semibold">Orders</th>
                  <th className="py-3 font-semibold">Total Spend</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c, idx) => (
                  <tr key={idx} className="border-b border-white/10 last:border-0 hover:bg-bg-dark/20">
                    <td className="py-3 font-semibold text-[var(--color-primary)]">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-[var(--color-border)]/10 text-[var(--color-primary)] flex items-center justify-center font-bold text-xs uppercase">
                          {c.fullName[0]}
                        </div>
                        {c.fullName}
                      </div>
                    </td>
                    <td className="py-3 font-light text-[#6D6D6D]">
                      <span className="flex items-center gap-1">
                        <Mail size={12} className="opacity-70" />
                        {c.email}
                      </span>
                    </td>
                    <td className="py-3 font-light text-[#6D6D6D]">
                      <span className="flex items-center gap-1">
                        <Phone size={12} className="opacity-70" />
                        {c.phone || "N/A"}
                      </span>
                    </td>
                    <td className="py-3 font-semibold text-text-light">{c.ordersCount} orders</td>
                    <td className="py-3 font-bold text-[#556B2F]">₹{c.totalSpend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
