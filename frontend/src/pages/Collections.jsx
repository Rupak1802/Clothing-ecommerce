import { Link } from "react-router-dom";
import { COLLECTIONS } from "../data/products";
import { ArrowRight } from "lucide-react";

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-bg-dark py-12 px-4 sm:px-6 lg:px-8 text-text-light">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-accent text-2xl text-[var(--color-border)]">AURA Looks</span>
          <h1 className="mt-2 font-display text-3xl font-light uppercase tracking-widest text-[var(--color-primary)]">
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
              className="group relative flex flex-col bg-bg-secondary border border-border/15 rounded-3xl overflow-hidden shadow-md transition-shadow hover:shadow-lg"
            >
              {/* Image Frame */}
              <div className="aspect-[4/5] overflow-hidden bg-bg-secondary relative">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {collection.tag && (
                  <span className="absolute top-4 left-4 z-10 rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-wider bg-primary text-white">
                    {collection.tag}
                  </span>
                )}
              </div>

              {/* Card content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-lg font-medium text-text-light group-hover:text-[var(--color-border)] transition-colors">
                    {collection.title}
                  </h3>
                  <p className="mt-2 text-xs font-light text-[#6D6D6D] leading-relaxed">
                    {collection.description}
                  </p>
                </div>

                <Link
                  to={`/?collection=${collection.id}`}
                  className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] hover:text-[var(--color-border)] transition-colors"
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
