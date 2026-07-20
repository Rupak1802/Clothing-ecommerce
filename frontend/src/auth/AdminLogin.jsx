import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, ArrowLeft, ShieldAlert } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const rememberedEmail = localStorage.getItem("aura_remember_admin_email") || "";

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: rememberedEmail,
      password: "",
      rememberMe: !!rememberedEmail
    }
  });

  const onSubmit = async (data) => {
    setError("");
    setSubmitting(true);
    try {
      if (data.rememberMe) {
        localStorage.setItem("aura_remember_admin_email", data.email);
      } else {
        localStorage.removeItem("aura_remember_admin_email");
      }

      await login(data.email, data.password, "admin");
      toast.success("Admin login successful. System dashboard active.");
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setError("Invalid admin credentials.");
      toast.error("Invalid admin credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#4B352A] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 text-[#F5F1E8]">
      {/* Return button */}
      <div className="absolute top-6 left-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F5F1E8] hover:text-[#7A8F52] transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Store
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white text-[#111111] p-8 rounded-2xl shadow-2xl border border-[#6F4E37]/30"
      >
        <div className="text-center mb-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#556B2F]/10 text-[#556B2F] mb-4">
            <ShieldAlert size={26} />
          </div>
          <span className="font-display text-3xl font-extrabold tracking-tight text-[#111111]">
            AURA<span className="font-accent text-lg font-normal lowercase tracking-normal text-[#556B2F] ml-0.5">admin</span>
          </span>
          <h2 className="mt-4 font-display text-xl font-bold uppercase tracking-wider text-[#4B352A]">
            Admin Login
          </h2>
          <p className="mt-2 text-xs font-light text-[#6D6D6D]">
            Sign in to access the Admin Dashboard
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2"
          >
            <ShieldAlert size={16} className="text-red-500 flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Admin Email */}
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#4B352A] mb-2">
              Admin Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#6D6D6D]/70 pointer-events-none">
                <Mail size={16} />
              </span>
              <input
                type="text"
                className={`block w-full pl-10 pr-4 py-3 rounded-xl border bg-[#F5F1E8]/30 text-sm placeholder-black/30 outline-none transition-all ${
                  errors.email
                    ? "border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-[#6F4E37]/20 focus:border-[#556B2F] focus:ring-1 focus:ring-[#556B2F]"
                }`}
                placeholder="admin@example.com"
                {...register("email", {
                  required: "Admin email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email format"
                  }
                })}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#4B352A] mb-2">
              Security Key
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#6D6D6D]/70 pointer-events-none">
                <Lock size={16} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className={`block w-full pl-10 pr-10 py-3 rounded-xl border bg-[#F5F1E8]/30 text-sm placeholder-black/30 outline-none transition-all ${
                  errors.password
                    ? "border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-[#6F4E37]/20 focus:border-[#556B2F] focus:ring-1 focus:ring-[#556B2F]"
                }`}
                placeholder="Enter password"
                {...register("password", {
                  required: "Password is required"
                })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6D6D6D] hover:opacity-85 focus:outline-none cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.password.message}</p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center text-[#6D6D6D] cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 rounded border-[#6F4E37]/20 text-[#556B2F] focus:ring-[#556B2F]"
                {...register("rememberMe")}
              />
              Remember Me
            </label>
            <Link
              to="/forgot-password"
              className="text-[#556B2F] hover:underline transition-colors font-medium"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={submitting}
            className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl text-xs font-semibold uppercase tracking-widest text-white bg-[#4B352A] hover:bg-[#556B2F] transition-colors focus:outline-none cursor-pointer shadow-md disabled:opacity-50"
          >
            {submitting ? "Verifying..." : "Access Dashboard"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
