import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Feather, Scissors, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F5F1E8] py-16 px-4 sm:px-6 lg:px-8 text-[#111111]">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 border border-[#6F4E37]/15 shadow-md">
        <div className="text-center mb-12">
          <span className="font-accent text-3xl text-[#6F4E37]">The Heritage</span>
          <h1 className="mt-2 font-display text-4xl font-light uppercase tracking-widest text-[#4B352A]">
            AURA Studio
          </h1>
          <div className="h-[1px] w-24 bg-[#4B352A] mx-auto mt-6" />
        </div>

        {/* Story Section */}
        <div className="space-y-8 text-xs font-light text-[#6D6D6D] leading-relaxed max-w-2xl mx-auto">
          <p>
            Established in 2024, <strong className="text-[#4B352A] font-semibold">AURA Studio</strong> was born out of a desire to create a minimalist wardrobe that counters the noise of fast fashion. We believe in the power of silhouette, the integrity of textile, and the craft of tailoring.
          </p>
          <p>
            Each piece is designed at our studios with meticulous attention to detail. We source our fabrics—from organic cotton blends and structured linen to premium Italian wools—from mills that share our commitment to environmental responsibility.
          </p>

          <blockquote className="border-l-2 border-[#556B2F] pl-4 italic text-sm text-[#4B352A] my-6 font-display font-light">
            "We do not design clothes for seasons; we construct garments for lifetimes. Beauty lies in refinement and ease."
          </blockquote>

          <p>
            Our aesthetics derive from architecture, nature's palettes, and neutral palettes. We are committed to a sustainable, low-impact supply chain, producing in limited, curated runs to minimize waste and ensure every garment meets our standards.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-12 border-t border-[#6F4E37]/10 text-center">
          <div className="flex flex-col items-center p-4">
            <div className="p-3 bg-[#F5F1E8] text-[#6F4E37] rounded-full mb-3">
              <Scissors size={20} />
            </div>
            <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-[#4B352A] mb-2">
              Precise Craft
            </h3>
            <p className="text-[10px] text-[#6D6D6D] font-light leading-relaxed">
              Every seam, cuff, and lapel is drafted with geometric precision for perfect fall and comfort.
            </p>
          </div>

          <div className="flex flex-col items-center p-4">
            <div className="p-3 bg-[#F5F1E8] text-[#556B2F] rounded-full mb-3">
              <Feather size={20} />
            </div>
            <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-[#4B352A] mb-2">
              Organic Fibers
            </h3>
            <p className="text-[10px] text-[#6D6D6D] font-light leading-relaxed">
              We exclusively use GOTS-certified organic cottons, pure linen, and luxury recycled wool.
            </p>
          </div>

          <div className="flex flex-col items-center p-4">
            <div className="p-3 bg-[#F5F1E8] text-[#4B352A] rounded-full mb-3">
              <Heart size={20} />
            </div>
            <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-[#4B352A] mb-2">
              Fair Production
            </h3>
            <p className="text-[10px] text-[#6D6D6D] font-light leading-relaxed">
              We collaborate with family-owned small workshops ensuring safe environments and living wages.
            </p>
          </div>
        </div>

        <div className="text-center mt-12 pt-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl bg-[#4B352A] hover:bg-[#6F4E37] px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-white shadow-md transition-colors"
          >
            Shop the Collections
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
