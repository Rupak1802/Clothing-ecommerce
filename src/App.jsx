import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

// Layouts
import CustomerLayout from "./layouts/CustomerLayout";
import AdminLayout from "./layouts/AdminLayout";

// Route Guard
import ProtectedRoute from "./components/ProtectedRoute";

// Authentication Pages
import Login from "./auth/Login";
import Register from "./auth/Register";
import ForgotPassword from "./auth/ForgotPassword";
import AdminLogin from "./auth/AdminLogin";

// Customer Public Pages
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import CollectionsPage from "./pages/Collections";

// Customer Protected Pages
import CheckoutPage from "./pages/checkout";
import OrdersPage from "./pages/orders";
import ProfilePage from "./pages/profile";
import WishlistPage from "./pages/wishlist";

// Admin Protected Pages
import Dashboard from "./pages/dashboard";
import ProductManagement from "./pages/dashboard/Products";
import CategoryManagement from "./pages/dashboard/Categories";
import AdminOrders from "./pages/dashboard/Orders";
import AdminCustomers from "./pages/dashboard/Customers";
import Analytics from "./pages/dashboard/Analytics";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          {/* Customer Portal (Public & Protected routes) */}
          <Route element={<CustomerLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />

            {/* Customer Protected Routes */}
            <Route element={<ProtectedRoute role="customer" />}>
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Route>

          {/* Guest/Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Protected Routes */}
          <Route element={<ProtectedRoute role="admin" />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/products" element={<ProductManagement />} />
              <Route path="/admin/categories" element={<CategoryManagement />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/customers" element={<AdminCustomers />} />
              <Route path="/admin/analytics" element={<Analytics />} />
            </Route>
          </Route>

          {/* Catch-all Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}
