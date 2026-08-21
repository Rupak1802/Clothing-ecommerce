import { useEffect } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function ProtectedRoute({ role }) {
  const { isAuthenticated, role: userRole } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      if (location.pathname === "/checkout") {
        toast.info("Please login to continue your purchase.", { toastId: "checkout-login-toast" });
      }
    }
  }, [isAuthenticated, location]);

  if (!isAuthenticated) {
    // If admin is trying to access admin pages, redirect to admin login
    if (location.pathname.startsWith("/admin")) {
      return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role checking
  if (role && userRole !== role) {
    if (role === "admin") {
      toast.error("Unauthorized Access. Admin credentials required.", { toastId: "admin-unauthorized" });
      return <Navigate to="/" replace />;
    }
    if (role === "customer") {
      toast.error("Unauthorized Access.", { toastId: "customer-unauthorized" });
      return <Navigate to="/admin/dashboard" replace />;
    }
  }

  return <Outlet />;
}
