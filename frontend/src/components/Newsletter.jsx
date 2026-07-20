import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Check, ArrowRight } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    // Simulate API request
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1500);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-[#3D281D] shadow-xl grid grid-cols-1 md:grid-cols-2">
        {/* Left side: Image */}
        <div className="relative h-64 md:h-auto min-h-[320px] md:min-h-[460px]">
          <img
            src="/box image.jpg"
            alt="AURA boxes showcase"
            className="absolute inset-0 h-full w-full object-cover object-center animate-fade-in"
          />
          {/* Subtle overlay to blend the image with the card color theme */}
          <div className="absolute inset-0 bg-[#3D281D]/20 mix-blend-multiply" />
        </div>

        {/* Right side: Content */}
        <div className="relative z-10 px-6 py-16 sm:px-12 sm:py-20 lg:px-16 flex flex-col justify-center text-center md:text-left">
          {/* Subtle geometric lines */}
          <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none">
            <svg className="h-full w-full" fill="none" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1="0" y1="0" x2="100" y2="100" stroke="white" strokeWidth="0.5" />
              <line x1="100" y1="0" x2="0" y2="100" stroke="white" strokeWidth="0.5" />
            </svg>
          </div>
          
          <div className="max-w-md mx-auto md:mx-0 w-full">
            <AnimatePresence mode="wait">
              {status !== "success" ? (
                <motion.div
                  key="signup-form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {/* Heading */}
                  <span className="font-accent text-2xl text-[#ff2a74] block mb-2">
                    Studio Access
                  </span>
                  <h2 className="font-display text-3xl font-light tracking-tight text-white sm:text-4xl">
                    Join the AURA Circle
                  </h2>
                  <p className="mt-4 text-xs sm:text-sm font-light leading-relaxed text-white/70">
                    Receive early access to seasonal campaigns, exclusive drops, and editorial insights. Enjoy 15% off your first order.
                  </p>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="mt-8">
                    <div className="flex flex-col gap-3 sm:flex-row justify-center md:justify-start">
                      <div className="relative flex-grow max-w-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-white/50">
                          <Mail size={18} />
                        </div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (status === "error") setStatus("idle");
                          }}
                          placeholder="Enter your email address"
                          disabled={status === "loading"}
                          className={`block w-full rounded-xl border bg-white/5 py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/40 backdrop-blur-sm transition-all focus:outline-none focus:bg-white/10 ${
                            status === "error"
                              ? "border-red-500 focus:ring-1 focus:ring-red-500"
                              : "border-white/20 focus:border-[#ff2a74] focus:ring-1 focus:ring-[#ff2a74]"
                          }`}
                        />
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={status === "loading"}
                        className="flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-[#111111] hover:bg-[#ff2a74] hover:text-white transition-colors cursor-pointer disabled:opacity-55"
                      >
                        {status === "loading" ? "Subscribing..." : "Subscribe"}
                        <ArrowRight size={14} />
                      </motion.button>
                    </div>

                    {status === "error" && (
                      <motion.p
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 text-[11px] text-red-400 font-semibold uppercase tracking-wider text-center md:text-left"
                      >
                        Please provide a valid email address.
                      </motion.p>
                    )}
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="flex flex-col items-center md:items-start py-6"
                >
                  {/* Checkmark Animation */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 15 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg"
                  >
                    <Check size={32} strokeWidth={3} />
                  </motion.div>

                  <h3 className="mt-6 font-display text-2xl font-light text-white text-center md:text-left">
                    Welcome to AURA
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm font-light text-white/70 max-w-sm leading-relaxed text-center md:text-left">
                    Thank you for subscribing. We've sent a 15% discount code and welcome instructions directly to your inbox.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-[10px] font-semibold uppercase tracking-widest text-[#ff2a74] hover:underline focus:outline-none"
                  >
                    Back to Newsletter
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
