import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Feather, Scissors, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FFF9F3] py-16 px-4 sm:px-6 lg:px-8 text-[#443223]">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 border border-[#A08670]/15 shadow-md">
        <div className="text-center mb-12">
          <span className="font-accent text-3xl text-[#72583E]">The Heritage</span>
          <h1 className="mt-2 font-display text-4xl font-light uppercase tracking-widest text-[#44422D]">
            THUKIL
          </h1>
          <div className="h-[1px] w-24 bg-[#44422D] mx-auto mt-6" />
        </div>

        {/* Story Section */}
        <div className="space-y-8 text-xs font-light text-[#443223] leading-relaxed max-w-2xl mx-auto">
          <p>
            <strong className="text-[#44422D] font-semibold">THUKIL</strong> was created with one belief: what you wear should reflect who you are. Inspired by the Tamil word for cloth, THUKIL represents heritage, identity, and modern expression. We create premium streetwear that blends timeless design with contemporary style, using quality fabrics and thoughtful craftsmanship.
          </p>
          <p>
            Every piece is made for those who value authenticity, confidence, and lasting quality. Rooted in Tamil. Designed for the World.
          </p>

          <blockquote className="border-l-2 border-[#7C7960] pl-4 italic text-sm text-[#44422D] my-6 font-display font-light">
            "THUKIL is built on the belief that great clothing should have meaning, not just style."
          </blockquote>

          <p>
            Inspired by Tamil heritage, we create modern streetwear that respects tradition while embracing contemporary design. Every collection is thoughtfully developed using premium fabrics, comfortable oversized fits, and attention to detail that stands the test of time. We believe in quality over quantity, creating pieces you'll reach for again and again rather than following short-lived trends.
          </p>
          <p>
            Whether you're expressing your roots, your individuality, or simply your love for well-made clothing, THUKIL is designed to help you wear your story with confidence.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-12 border-t border-[#A08670]/10 text-center">
          <div className="flex flex-col items-center p-4">
            <div className="p-3 bg-[#FFF9F3] text-[#72583E] rounded-full mb-3">
              <Scissors size={20} />
            </div>
            <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-[#44422D] mb-2">
              Premium Quality
            </h3>
            <p className="text-[10px] text-[#443223] font-light leading-relaxed">
              Every collection is thoughtfully developed using premium fabrics and attention to detail.
            </p>
          </div>

          <div className="flex flex-col items-center p-4">
            <div className="p-3 bg-[#FFF9F3] text-[#7C7960] rounded-full mb-3">
              <Feather size={20} />
            </div>
            <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-[#44422D] mb-2">
              Oversized Fit
            </h3>
            <p className="text-[10px] text-[#443223] font-light leading-relaxed">
              Comfortable oversized fits that embrace contemporary design and respect tradition.
            </p>
          </div>

          <div className="flex flex-col items-center p-4">
            <div className="p-3 bg-[#FFF9F3] text-[#755151] rounded-full mb-3">
              <Heart size={20} />
            </div>
            <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-[#44422D] mb-2">
              Meaningful Clothing
            </h3>
            <p className="text-[10px] text-[#443223] font-light leading-relaxed">
              Made for those who value authenticity, confidence, and lasting quality over short-lived trends.
            </p>
          </div>
        </div>

        <div className="text-center mt-12 pt-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl bg-[#44422D] hover:bg-[#7C7960] px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-white shadow-md transition-colors"
          >
            Explore Collections
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
