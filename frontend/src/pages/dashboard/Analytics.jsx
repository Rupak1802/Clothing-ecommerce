import { useState, useEffect } from "react";
import { BarChart3, TrendingUp, DollarSign, Award, Percent } from "lucide-react";
import { PRODUCTS } from "../../data/products";

export default function Analytics() {
  const [totalSales, setTotalSales] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("aura_orders") || "[]");
    setOrdersCount(savedOrders.length);
    setTotalSales(savedOrders.reduce((sum, o) => sum + o.total, 0));
  }, []);

  const collectionSales = [
    { name: "Minimalist Tailoring", count: 48, pct: 60, color: "bg-[#6F4E37]" },
    { name: "Knitwear & Lounge", count: 24, pct: 30, color: "bg-[#556B2F]" },
    { name: "Summer Editorial", count: 8, pct: 10, color: "bg-[#7A8F52]" }
  ];

  const salesMonths = [
    { month: "Jan", sales: 1200 },
    { month: "Feb", sales: 1900 },
    { month: "Mar", sales: 1500 },
    { month: "Apr", sales: 2500 },
    { month: "May", sales: 2200 },
    { month: "Jun", sales: 3100 },
    { month: "Jul", sales: totalSales > 0 ? totalSales : 4000 }
  ];

  const maxMonthSales = Math.max(...salesMonths.map((m) => m.sales));

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#6F4E37]/10 shadow-sm">
        <div>
          <h2 className="font-display text-xl font-light uppercase tracking-wider text-[#4B352A]">
            Sales Analytics
          </h2>
          <p className="text-xs text-[#6D6D6D] font-light mt-0.5">
            Platform performance metrics and best selling groups
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#556B2F]/10 border border-[#556B2F]/20 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#556B2F]">
          <BarChart3 size={14} />
          Terminal Live
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sales Overview Bar Chart */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#6F4E37]/10 p-6 shadow-sm">
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-[#4B352A] pb-4 border-b border-black/5 mb-6">
            Monthly Revenue Trends
          </h3>

          <div className="h-64 flex items-end justify-between gap-2 pt-6">
            {salesMonths.map((m, idx) => {
              const heightPct = (m.sales / maxMonthSales) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <div className="text-[9px] font-bold text-[#4B352A] opacity-0 group-hover:opacity-100 transition-opacity">
                    ₹{m.sales}
                  </div>
                  <div
                    style={{ height: `${heightPct * 0.75}%` }}
                    className="w-full max-w-[36px] bg-[#6F4E37]/15 group-hover:bg-[#4B352A] rounded-t transition-all duration-300 relative"
                  >
                    {idx === salesMonths.length - 1 && (
                      <div className="absolute top-0 left-0 right-0 h-1 bg-[#556B2F] rounded-t" />
                    )}
                  </div>
                  <span className="text-[10px] text-[#6D6D6D] font-light mt-1">{m.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Collection Shares */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-[#6F4E37]/10 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-[#4B352A] pb-4 border-b border-black/5 mb-6">
              Collection Revenue Share
            </h3>

            <div className="space-y-4">
              {collectionSales.map((col, idx) => (
                <div key={idx} className="space-y-1.5 text-xs">
                  <div className="flex justify-between font-medium text-[#111111]">
                    <span>{col.name}</span>
                    <span className="font-semibold text-[#4B352A]">{col.pct}%</span>
                  </div>
                  <div className="w-full bg-[#F5F1E8] h-2 rounded-full overflow-hidden">
                    <div style={{ width: `${col.pct}%` }} className={`h-full ${col.color}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#556B2F]/10 border border-[#556B2F]/20 p-4 rounded-xl flex items-center gap-3 text-xs mt-6 text-[#556B2F]">
            <Award size={20} className="flex-shrink-0" />
            <p className="font-light leading-relaxed">
              <strong className="font-semibold">Tailored Classics</strong> continues to command the catalog share with a 60% revenue index this fiscal period.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
