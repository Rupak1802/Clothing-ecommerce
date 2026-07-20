import { Star } from "lucide-react";
import { TESTIMONIALS } from "../data/products";

export default function Testimonials() {
  // Duplicate reviews for infinite marquee effect
  const repeatedReviews = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="bg-[#f2ede2] py-20 overflow-hidden border-y border-[#e5e4e7]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <span className="font-accent text-3xl text-[#ff2a74] block mb-2">
          Customer Notes
        </span>
        <h2 className="font-display text-3xl font-light tracking-tight sm:text-4xl text-[#111111]">
          Loved by the Community
        </h2>
        <div className="mt-4 mx-auto h-[1px] w-20 bg-[#e5e4e7]" />
      </div>

      {/* Infinite Marquee Scroll Container */}
      <div className="relative flex w-full overflow-x-hidden">
        {/* Left & Right Editorial Fades */}
        <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#f2ede2] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#f2ede2] to-transparent pointer-events-none" />

        <div className="animate-marquee-scroll flex gap-6 px-4">
          {repeatedReviews.map((review, idx) => (
            <div
              key={`${review.id}-${idx}`}
              className="w-[300px] shrink-0 rounded-2xl bg-white border border-[#e5e4e7] p-6 shadow-sm hover:shadow-md hover:border-[#ff2a74]/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating */}
                <div className="flex text-amber-500 mb-4 gap-0.5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                {/* Review Text */}
                <p className="text-xs font-light leading-relaxed text-[#6b6375] italic">
                  "{review.text}"
                </p>
              </div>

              <div className="mt-6 border-t border-[#e5e4e7]/60 pt-4 flex items-center justify-between">
                <div>
                  <h4 className="font-display text-sm font-medium text-[#111111]">
                    {review.name}
                  </h4>
                  <span className="text-[10px] uppercase tracking-wider text-[#6b6375] font-semibold mt-0.5 block">
                    {review.role}
                  </span>
                </div>
                <div className="font-accent text-lg text-[#ff2a74]/60 font-bold select-none">
                  Verified
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
