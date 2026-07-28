import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  ShoppingBag,
  ListOrdered,
  Users,
  BarChart3,
  LogOut,
  Menu,
  X,
  FolderOpen
} from "lucide-react";
import { toast } from "react-toastify";

export default function AdminLayout() {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully.");
    navigate("/admin/login");
  };

  const navItems = [
    { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Products", path: "/admin/products", icon: ShoppingBag },
    { label: "Categories", path: "/admin/categories", icon: FolderOpen },
    { label: "Orders", path: "/admin/orders", icon: ListOrdered },
    { label: "Customers", path: "/admin/customers", icon: Users },
    { label: "Analytics", path: "/admin/analytics", icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-bg-dark flex text-text-light antialiased">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-primary text-[var(--color-bg-dark)] border-r border-border/20">
        <div className="h-20 flex items-center justify-center border-b border-border/30 px-6">
          <span className="font-display text-2xl font-extrabold tracking-widest text-[var(--color-bg-dark)]">
            THUKIL <span className="text-[#7A8F52] text-sm tracking-normal">admin</span>
          </span>
        </div>

        {/* User Info Card */}
        <div className="p-4 border-b border-border/20 bg-[var(--color-border)]/10">
          <p className="text-[10px] uppercase tracking-wider text-[var(--color-bg-dark)]/60 font-semibold">Logged in as</p>
          <p className="text-sm font-medium truncate text-white">{currentUser?.fullName || "Administrator"}</p>
          <p className="text-xs text-[var(--color-bg-dark)]/70 truncate mt-0.5">{currentUser?.email}</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? "bg-[#556B2F] text-white shadow-md border-l-4 border-[#7A8F52]"
                    : "text-[var(--color-bg-dark)]/85 hover:bg-primary/90/20 hover:text-white"
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-border/20">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider text-[var(--color-bg-dark)]/85 hover:bg-[#ff4d4d]/10 hover:text-red-400 transition-colors cursor-pointer"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Drawer (Overlay) */}
      <div className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
        <aside className={`absolute top-0 bottom-0 left-0 w-64 bg-primary text-[var(--color-bg-dark)] flex flex-col transition-transform duration-300 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="h-20 flex items-center justify-between px-6 border-b border-border/30">
            <span className="font-display text-2xl font-extrabold tracking-widest text-[var(--color-bg-dark)]">
              THUKIL <span className="text-[#7A8F52] text-sm tracking-normal">admin</span>
            </span>
            <button onClick={() => setSidebarOpen(false)} className="text-[var(--color-bg-dark)] hover:opacity-80">
              <X size={22} />
            </button>
          </div>

          <div className="p-4 border-b border-border/20 bg-[var(--color-border)]/10">
            <p className="text-[10px] uppercase tracking-wider text-[var(--color-bg-dark)]/60 font-semibold">Logged in as</p>
            <p className="text-sm font-medium truncate text-white">{currentUser?.fullName || "Admin"}</p>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? "bg-[#556B2F] text-white shadow-md"
                      : "text-[var(--color-bg-dark)]/85 hover:bg-primary/90/20 hover:text-white"
                  }`
                }
              >
                <item.icon size={18} />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t border-border/20">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider text-red-400 hover:bg-red-950/20 cursor-pointer"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </aside>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-x-hidden min-h-screen">
        {/* Mobile Header Bar */}
        <header className="h-20 bg-bg-secondary border-b border-border/10 flex items-center justify-between px-6 md:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 text-text-light hover:bg-bg-dark rounded-lg md:hidden"
            >
              <Menu size={24} />
            </button>
            <h1 className="font-display text-xl font-medium tracking-wide text-[var(--color-primary)]">
              Portal Control Desk
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-[#556B2F]/10 border border-[#556B2F]/20 text-[#556B2F] text-[10px] font-bold uppercase tracking-wider">
              System Live
            </span>
            <div className="h-8 w-8 rounded-full bg-[var(--color-border)] text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm">
              {currentUser?.fullName?.[0] || "A"}
            </div>
          </div>
        </header>

        {/* Subpage Container */}
        <main className="flex-1 p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
