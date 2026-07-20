import { Link } from "react-router-dom";
import { COLLECTIONS } from "../data/products";
import { ArrowRight } from "lucide-react";

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-[#F5F1E8] py-12 px-4 sm:px-6 lg:px-8 text-[#111111]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-accent text-2xl text-[#6F4E37]">AURA Looks</span>
          <h1 className="mt-2 font-display text-3xl font-light uppercase tracking-widest text-[#4B352A]">
            The Collections
          </h1>
          <p className="text-xs text-[#6D6D6D] font-light mt-1 max-w-sm mx-auto">
            Explore curated design philosophies and high-quality capsule pieces
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COLLECTIONS.map((collection) => (
            <div
              key={collection.id}
              className="group relative flex flex-col bg-white border border-[#6F4E37]/15 rounded-3xl overflow-hidden shadow-md transition-shadow hover:shadow-lg"
            >
              {/* Image Frame */}
              <div className="aspect-[4/5] overflow-hidden bg-[#f5efe4] relative">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {collection.tag && (
                  <span className="absolute top-4 left-4 z-10 rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-wider bg-[#4B352A] text-white">
                    {collection.tag}
                  </span>
                )}
              </div>

              {/* Card content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-lg font-medium text-[#111111] group-hover:text-[#6F4E37] transition-colors">
                    {collection.title}
                  </h3>
                  <p className="mt-2 text-xs font-light text-[#6D6D6D] leading-relaxed">
                    {collection.description}
                  </p>
                </div>

                <Link
                  to={`/?collection=${collection.id}`}
                  className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#4B352A] hover:text-[#6F4E37] transition-colors"
                >
                  View Collection
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
