import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, KeyRound } from "lucide-react";
import { toast } from "react-toastify";
import { useState } from "react";

export default function ForgotPassword() {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: ""
    }
  });

  const onSubmit = (data) => {
    setSubmitting(true);
    setTimeout(() => {
      toast.success(`Reset link sent successfully to ${data.email}. Please check your inbox.`);
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 text-[#111111]">
      <div className="absolute top-6 left-6">
        <Link
          to="/login"
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4B352A] hover:text-[#6F4E37] transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Login
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white border border-[#6F4E37]/10 p-8 rounded-2xl shadow-xl text-center"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F5F1E8] text-[#6F4E37] mb-6">
          <KeyRound size={24} />
        </div>

        <h2 className="font-display text-2xl font-light uppercase tracking-widest text-[#4B352A] mb-2">
          Forgot Password
        </h2>
        <p className="text-xs font-light text-[#6D6D6D] mb-6 max-w-xs mx-auto leading-relaxed">
          Enter the email associated with your account, and we will transmit a link to reset your credentials.
        </p>

        <form className="space-y-6 text-left" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#4B352A] mb-2">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#6D6D6D]/70 pointer-events-none">
                <Mail size={16} />
              </span>
              <input
                type="text"
                className={`block w-full pl-10 pr-4 py-3 rounded-xl border bg-[#F5F1E8]/30 text-sm placeholder-black/30 outline-none transition-all ${
                  errors.email ? "border-red-500" : "border-[#6F4E37]/20 focus:border-[#4B352A]"
                }`}
                placeholder="customer@aura.com"
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

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={submitting}
            className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl text-xs font-semibold uppercase tracking-widest text-white bg-[#4B352A] hover:bg-[#6F4E37] transition-colors focus:outline-none cursor-pointer shadow-md disabled:opacity-50"
          >
            {submitting ? "Sending Link..." : "Send Reset Link"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
