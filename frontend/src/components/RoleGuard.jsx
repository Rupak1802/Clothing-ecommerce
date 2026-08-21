import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function RoleGuard({ allowedRoles }) {
  const { role, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && !allowedRoles.includes(role)) {
      toast.error("Unauthorized Access.", { toastId: "role-guard-unauthorized" });
    }
  }, [isAuthenticated, role, allowedRoles]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return role === "admin" ? <Navigate to="/admin/dashboard" replace /> : <Navigate to="/" replace />;
  }

  return <Outlet />;
}
