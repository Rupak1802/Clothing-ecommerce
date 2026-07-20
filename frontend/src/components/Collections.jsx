import { motion } from "framer-motion";
import { COLLECTIONS } from "../data/products";

export default function Collections({ onSelectCollection }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15
      }
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      {/* Section Title */}
      <div className="mb-12 flex flex-col items-center justify-between border-b border-[#e5e4e7] pb-6 sm:flex-row">
        <div className="text-center sm:text-left">
          <span className="font-accent text-3xl text-[#ff2a74] block mb-2 sm:inline-block sm:mr-3">
            Selected Drops
          </span>
          <h2 className="font-display text-3xl font-light tracking-tight sm:text-4xl text-[#111111] inline-block">
            Curated Collections
          </h2>
        </div>
        <p className="mt-4 max-w-xs text-center text-xs tracking-wider text-[#6b6375] uppercase sm:mt-0 sm:text-right">
          Explore capsule wardrobes designed to layer seamlessly.
        </p>
      </div>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 gap-8 md:grid-cols-3"
      >
        {COLLECTIONS.map((collection) => (
          <motion.div
            key={collection.id}
            variants={itemVariants}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            onClick={() => onSelectCollection(collection.id)}
            className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white border border-[#e5e4e7] p-4 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            {/* Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#f5efe4]">
              <img
                src={collection.image}
                alt={collection.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Hand-drawn Accent Tag Overlay */}
              <div className="absolute top-4 left-4 z-10">
                <motion.div
                  initial={{ rotate: -5 }}
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  className="rounded-full bg-[#ff2a74] px-4 py-1 text-white shadow-md"
                >
                  <span className="font-accent text-lg font-bold leading-none select-none">
                    {collection.tag}
                  </span>
                </motion.div>
              </div>

              {/* Gradient Bottom Fade */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
            </div>

            {/* Collection Metadata */}
            <div className="mt-6 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-xl font-medium text-[#111111] group-hover:text-[#ff2a74] transition-colors">
                  {collection.title}
                </h3>
                <p className="mt-2 text-xs font-light leading-relaxed text-[#6b6375]">
                  {collection.description}
                </p>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#111111] group-hover:underline">
                View Pieces &rarr;
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
