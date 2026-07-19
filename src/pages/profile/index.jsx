import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { User, Phone, Mail, Lock, ShieldCheck } from "lucide-react";
import { useState } from "react";

export default function ProfilePage() {
  const { currentUser, updateProfile } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      fullName: currentUser?.fullName || "",
      phone: currentUser?.phone || "",
      password: "",
      confirmPassword: ""
    }
  });

  const newPassword = watch("password");

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const updateData = {
        fullName: data.fullName,
        phone: data.phone
      };

      if (data.password) {
        updateData.password = data.password;
      }

      await updateProfile(updateData);
      toast.success("Profile details updated successfully.");
      // Reset password fields
      setValue("password", "");
      setValue("confirmPassword", "");
    } catch (err) {
      toast.error(err.message || "Failed to update profile.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] py-12 px-4 sm:px-6 lg:px-8 text-[#111111]">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-3xl font-light uppercase tracking-widest text-[#4B352A] mb-8">
          Account Profile
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Sidebar brief details */}
          <div className="md:col-span-4 bg-white rounded-2xl p-6 border border-[#6F4E37]/10 text-center shadow-md">
            <div className="mx-auto h-20 w-20 rounded-full bg-[#4B352A] text-[#F5F1E8] flex items-center justify-center font-display text-3xl uppercase tracking-wider font-extrabold mb-4 shadow-inner">
              {currentUser?.fullName?.[0] || "U"}
            </div>
            <h3 className="font-semibold text-base text-[#111111]">{currentUser?.fullName}</h3>
            <p className="text-xs text-[#6D6D6D] font-light mt-0.5">{currentUser?.email}</p>
            <div className="mt-4 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#556B2F]/10 border border-[#556B2F]/20 text-[#556B2F] text-[9px] font-bold uppercase tracking-wider">
              <ShieldCheck size={12} />
              Verified Account
            </div>
          </div>

          {/* Edit Form */}
          <div className="md:col-span-8 bg-white rounded-2xl p-6 md:p-8 border border-[#6F4E37]/10 shadow-md">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#4B352A] mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#6D6D6D] pointer-events-none">
                      <User size={14} />
                    </span>
                    <input
                      type="text"
                      className="block w-full pl-9 pr-4 py-2.5 border border-[#6F4E37]/20 focus:border-[#4B352A] rounded-xl bg-[#F5F1E8]/20 outline-none text-xs"
                      {...register("fullName", { required: "Name is required" })}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#4B352A] mb-1.5">
                    Phone Number
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#6D6D6D] pointer-events-none">
                      <Phone size={14} />
                    </span>
                    <input
                      type="tel"
                      className="block w-full pl-9 pr-4 py-2.5 border border-[#6F4E37]/20 focus:border-[#4B352A] rounded-xl bg-[#F5F1E8]/20 outline-none text-xs"
                      {...register("phone", {
                        required: "Phone is required",
                        pattern: { value: /^[+]?[0-9\s-]{7,15}$/, message: "Invalid phone format" }
                      })}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              {/* Email (Readonly) */}
              <div>
                <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#4B352A] mb-1.5">
                  Email Address (Not editable)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#6D6D6D] pointer-events-none">
                    <Mail size={14} />
                  </span>
                  <input
                    type="text"
                    disabled
                    className="block w-full pl-9 pr-4 py-2.5 border border-[#6F4E37]/10 rounded-xl bg-[#F5F1E8]/50 text-xs text-[#6D6D6D] cursor-not-allowed outline-none"
                    value={currentUser?.email}
                  />
                </div>
              </div>

              <div className="border-t border-[#6F4E37]/10 pt-6">
                <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-[#4B352A] mb-4">
                  Change Password (Leave blank to keep current)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* New Password */}
                  <div>
                    <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#4B352A] mb-1.5">
                      New Password
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#6D6D6D] pointer-events-none">
                        <Lock size={14} />
                      </span>
                      <input
                        type="password"
                        placeholder="••••••"
                        className="block w-full pl-9 pr-4 py-2.5 border border-[#6F4E37]/20 focus:border-[#4B352A] rounded-xl bg-[#F5F1E8]/20 outline-none text-xs"
                        {...register("password", {
                          minLength: { value: 6, message: "Must be min. 6 characters" }
                        })}
                      />
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#4B352A] mb-1.5">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#6D6D6D] pointer-events-none">
                        <Lock size={14} />
                      </span>
                      <input
                        type="password"
                        placeholder="••••••"
                        className="block w-full pl-9 pr-4 py-2.5 border border-[#6F4E37]/20 focus:border-[#4B352A] rounded-xl bg-[#F5F1E8]/20 outline-none text-xs"
                        {...register("confirmPassword", {
                          validate: (val) =>
                            !newPassword || val === newPassword || "Passwords do not match"
                        })}
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-xs text-red-600">{errors.confirmPassword.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-6 py-3 bg-[#4B352A] hover:bg-[#6F4E37] text-white rounded-xl text-xs font-semibold uppercase tracking-widest transition-colors shadow-md disabled:opacity-50 cursor-pointer"
              >
                {submitting ? "Updating..." : "Save Changes"}
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
