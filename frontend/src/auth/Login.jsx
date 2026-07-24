import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  });

  const fromPath = location.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await login(data.email, data.password, "customer");
      toast.success("Login successful! Welcome back.");
      
      // If remember me is set
      if (data.rememberMe) {
        localStorage.setItem("aura_remember_email", data.email);
      } else {
        localStorage.removeItem("aura_remember_email");
      }
      
      navigate(fromPath, { replace: true });
    } catch (err) {
      toast.error(err.message || "Invalid credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 text-[#111111]">
      {/* Return button */}
      <div className="absolute top-6 left-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4B352A] hover:text-[#6F4E37] transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Store
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white border border-[#6F4E37]/10 p-8 rounded-2xl shadow-xl"
      >
        <div className="text-center mb-8">
          <span className="font-display text-3xl font-extrabold tracking-tight text-[#111111]">
            AURA<span className="font-accent text-lg font-normal lowercase tracking-normal text-[#6F4E37] ml-0.5">studio</span>
          </span>
          <h2 className="mt-4 font-display text-xl font-light uppercase tracking-widest text-[#4B352A]">
            Customer Login
          </h2>
          <p className="mt-2 text-xs font-light text-[#6D6D6D]">
            Access your profile, orders, and premium selections
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Email or Phone field */}
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#4B352A] mb-2">
              Email or Phone Number
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
                    : "border-[#6F4E37]/20 focus:border-[#4B352A] focus:ring-1 focus:ring-[#4B352A]"
                }`}
                placeholder="email@example.com or phone"
                {...register("email", {
                  required: "Email or Phone is required",
                  validate: (value) => {
                    const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
                    const isPhone = /^[+]?[0-9\s-]{7,15}$/.test(value);
                    return isEmail || isPhone || "Invalid email or phone number";
                  }
                })}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.email.message}</p>
            )}
          </div>

          {/* Password field */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#4B352A]">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-[10px] font-bold uppercase tracking-wider text-[#6F4E37] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#6D6D6D]/70 pointer-events-none">
                <Lock size={16} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className={`block w-full pl-10 pr-10 py-3 rounded-xl border bg-[#F5F1E8]/30 text-sm placeholder-black/30 outline-none transition-all ${
                  errors.password
                    ? "border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-[#6F4E37]/20 focus:border-[#4B352A] focus:ring-1 focus:ring-[#4B352A]"
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

          {/* Remember me */}
          <div className="flex items-center">
            <input
              id="rememberMe"
              type="checkbox"
              className="h-4 w-4 rounded border-[#6F4E37]/30 text-[#4B352A] focus:ring-[#4B352A] focus:ring-offset-0 cursor-pointer"
              {...register("rememberMe")}
            />
            <label htmlFor="rememberMe" className="ml-2 block text-xs font-light text-[#6D6D6D] cursor-pointer">
              Remember me on this browser
            </label>
          </div>

          {/* Submit button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={submitting}
            className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl text-xs font-semibold uppercase tracking-widest text-white bg-[#4B352A] hover:bg-[#6F4E37] transition-colors focus:outline-none cursor-pointer shadow-md disabled:opacity-50"
          >
            {submitting ? "Signing in..." : "Sign In"}
          </motion.button>
        </form>

        <div className="mt-8 text-center border-t border-[#6F4E37]/10 pt-6">
          <p className="text-xs font-light text-[#6D6D6D]">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold uppercase tracking-wider text-[#6F4E37] hover:text-[#4B352A] ml-1"
            >
              Register
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
