import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const onSubmit = (data) => {
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Thank you! Your message has been sent to our concierge desk.");
      reset();
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] py-12 px-4 sm:px-6 lg:px-8 text-[#111111]">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl p-6 md:p-10 border border-[#6F4E37]/15 shadow-md">
        <div className="text-center mb-12">
          <span className="font-accent text-2xl text-[#6F4E37]">Concierge Desk</span>
          <h1 className="mt-2 font-display text-3xl font-light uppercase tracking-widest text-[#4B352A]">
            Contact Us
          </h1>
          <div className="h-[1px] w-20 bg-[#4B352A] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Info Side */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-[#4B352A]">
              Get In Touch
            </h3>
            <p className="text-xs font-light text-[#6D6D6D] leading-relaxed">
              If you have inquiries regarding measurements, fabric customization, orders, or styling guidance, please contact our concierge team.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <span className="p-2 bg-[#F5F1E8] text-[#6F4E37] rounded-lg mt-0.5">
                  <Mail size={16} />
                </span>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#4B352A]">Email</h4>
                  <p className="text-xs text-[#6D6D6D] font-light mt-0.5">concierge@aurastudio.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="p-2 bg-[#F5F1E8] text-[#556B2F] rounded-lg mt-0.5">
                  <Phone size={16} />
                </span>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#4B352A]">Concierge Phone</h4>
                  <p className="text-xs text-[#6D6D6D] font-light mt-0.5">+1 (800) 555-0199</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="p-2 bg-[#F5F1E8] text-[#4B352A] rounded-lg mt-0.5">
                  <MapPin size={16} />
                </span>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#4B352A]">Head Office</h4>
                  <p className="text-xs text-[#6D6D6D] font-light mt-0.5">
                    452 Editorial Ave, Suite 100<br />
                    New York, NY 10013
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-8 bg-[#F5F1E8]/20 border border-[#6F4E37]/10 p-6 md:p-8 rounded-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#4B352A] mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="block w-full border border-[#6F4E37]/20 focus:border-[#4B352A] rounded-xl px-4 py-2.5 bg-white outline-none"
                    placeholder="Elena Rostova"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#4B352A] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="text"
                    className="block w-full border border-[#6F4E37]/20 focus:border-[#4B352A] rounded-xl px-4 py-2.5 bg-white outline-none"
                    placeholder="elena@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email" }
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#4B352A] mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  className="block w-full border border-[#6F4E37]/20 focus:border-[#4B352A] rounded-xl px-4 py-2.5 bg-white outline-none"
                  placeholder="Styling consultation, custom sizing, order inquiry..."
                  {...register("subject", { required: "Subject is required" })}
                />
                {errors.subject && (
                  <p className="mt-1 text-xs text-red-600">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#4B352A] mb-1.5">
                  Your Message
                </label>
                <textarea
                  rows="5"
                  className="block w-full border border-[#6F4E37]/20 focus:border-[#4B352A] rounded-xl px-4 py-2.5 bg-white outline-none resize-none font-light leading-relaxed"
                  placeholder="Write your message here..."
                  {...register("message", { required: "Message is required" })}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-6 py-3 bg-[#4B352A] hover:bg-[#6F4E37] text-white rounded-xl text-xs font-semibold uppercase tracking-widest transition-colors shadow-md disabled:opacity-50 cursor-pointer"
              >
                <Send size={14} />
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
