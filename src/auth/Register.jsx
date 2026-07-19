import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, User, Mail, Phone, Lock, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false
    }
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const { agreeTerms, confirmPassword, ...userData } = data;
      await registerUser(userData);
      toast.success("Account created successfully! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.message || "Registration failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 text-[#111111]">
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
            Create Account
          </h2>
          <p className="mt-2 text-xs font-light text-[#6D6D6D]">
            Join Aura Studio for bespoke details and simple checkout
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name */}
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#4B352A] mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#6D6D6D]/70 pointer-events-none">
                <User size={16} />
              </span>
              <input
                type="text"
                className={`block w-full pl-10 pr-4 py-2.5 rounded-xl border bg-[#F5F1E8]/30 text-sm placeholder-black/30 outline-none transition-all ${
                  errors.fullName ? "border-red-500" : "border-[#6F4E37]/20 focus:border-[#4B352A]"
                }`}
                placeholder="Elena Rostova"
                {...register("fullName", { required: "Full name is required" })}
              />
            </div>
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#4B352A] mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#6D6D6D]/70 pointer-events-none">
                <Mail size={16} />
              </span>
              <input
                type="text"
                className={`block w-full pl-10 pr-4 py-2.5 rounded-xl border bg-[#F5F1E8]/30 text-sm placeholder-black/30 outline-none transition-all ${
                  errors.email ? "border-red-500" : "border-[#6F4E37]/20 focus:border-[#4B352A]"
                }`}
                placeholder="elena@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.email.message}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#4B352A] mb-1.5">
              Phone Number
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#6D6D6D]/70 pointer-events-none">
                <Phone size={16} />
              </span>
              <input
                type="tel"
                className={`block w-full pl-10 pr-4 py-2.5 rounded-xl border bg-[#F5F1E8]/30 text-sm placeholder-black/30 outline-none transition-all ${
                  errors.phone ? "border-red-500" : "border-[#6F4E37]/20 focus:border-[#4B352A]"
                }`}
                placeholder="+1 555 123 4567"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[+]?[0-9\s-]{7,15}$/,
                    message: "Invalid phone number"
                  }
                })}
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.phone.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#4B352A] mb-1.5">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#6D6D6D]/70 pointer-events-none">
                <Lock size={16} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className={`block w-full pl-10 pr-10 py-2.5 rounded-xl border bg-[#F5F1E8]/30 text-sm placeholder-black/30 outline-none transition-all ${
                  errors.password ? "border-red-500" : "border-[#6F4E37]/20 focus:border-[#4B352A]"
                }`}
                placeholder="Min. 6 characters"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6D6D6D] cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#4B352A] mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#6D6D6D]/70 pointer-events-none">
                <Lock size={16} />
              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className={`block w-full pl-10 pr-10 py-2.5 rounded-xl border bg-[#F5F1E8]/30 text-sm placeholder-black/30 outline-none transition-all ${
                  errors.confirmPassword ? "border-red-500" : "border-[#6F4E37]/20 focus:border-[#4B352A]"
                }`}
                placeholder="Confirm your password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (val) => val === password || "Passwords do not match"
                })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6D6D6D] cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="flex flex-col">
            <div className="flex items-start">
              <input
                id="agreeTerms"
                type="checkbox"
                className="mt-0.5 h-4 w-4 rounded border-[#6F4E37]/30 text-[#4B352A] focus:ring-[#4B352A] cursor-pointer"
                {...register("agreeTerms", { required: "You must agree to the Terms & Conditions" })}
              />
              <label htmlFor="agreeTerms" className="ml-2 block text-xs font-light text-[#6D6D6D] cursor-pointer leading-tight">
                I agree to the Terms & Conditions and Privacy Policy
              </label>
            </div>
            {errors.agreeTerms && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.agreeTerms.message}</p>
            )}
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={submitting}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl text-xs font-semibold uppercase tracking-widest text-white bg-[#4B352A] hover:bg-[#6F4E37] transition-colors focus:outline-none cursor-pointer shadow-md disabled:opacity-50 mt-4"
          >
            {submitting ? "Creating Account..." : "Create Account"}
          </motion.button>
        </form>

        <div className="mt-6 text-center border-t border-[#6F4E37]/10 pt-4">
          <p className="text-xs font-light text-[#6D6D6D]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold uppercase tracking-wider text-[#6F4E37] hover:text-[#4B352A] ml-1"
            >
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
