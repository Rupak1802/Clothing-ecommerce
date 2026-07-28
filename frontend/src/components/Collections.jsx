import { motion } from "framer-motion";
import { COLLECTIONS } from "../data/products";
import { GlowCard } from "./ui/GlowCard";

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
      <div className="mb-12 flex flex-col items-center justify-between border-b border-border pb-6 sm:flex-row">
        <div className="text-center sm:text-left">
          <span className="font-accent text-3xl text-primary block mb-2 sm:inline-block sm:mr-3">
            Selected Drops
          </span>
          <h2 className="font-display text-3xl font-light tracking-tight sm:text-4xl text-text-light inline-block">
            Curated Collections
          </h2>
        </div>
        <p className="mt-4 max-w-xs text-center text-xs tracking-wider text-text-muted uppercase sm:mt-0 sm:text-right">
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
            className="group relative cursor-pointer h-full transition-all duration-300"
          >
            <GlowCard 
              customSize={true} 
              glowColor="latte"
              className="flex flex-col h-full w-full overflow-hidden p-4 hover:shadow-xl"
            >
            {/* Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-bg-secondary">
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
                  className="rounded-full bg-primary px-4 py-1 text-bg-dark shadow-md"
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
                <h3 className="font-display text-xl font-medium text-text-primary group-hover:text-primary transition-colors">
                  {collection.title}
                </h3>
                <p className="mt-2 text-xs font-light leading-relaxed text-text-muted">
                  {collection.description}
                </p>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-text-light group-hover:underline">
                View Pieces &rarr;
              </div>
            </div>
            </GlowCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
