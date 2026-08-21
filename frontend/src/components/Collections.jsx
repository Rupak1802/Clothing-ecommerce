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
    hidden: { opacity: 0, y: 20 },
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
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 gap-4 md:grid-cols-3"
      >
        {COLLECTIONS.map((collection) => (
          <motion.div
            key={collection.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            onClick={() => onSelectCollection(collection.id)}
            className="group relative cursor-pointer h-full w-full overflow-hidden rounded-2xl transition-all duration-300 aspect-[4/5] sm:aspect-square md:aspect-[4/5]"
          >
            {/* Image */}
            <img
              src={collection.image}
              alt={collection.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
            
            {/* Gradient Overlay for Text Readability (subtle) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70 group-hover:opacity-80 transition-opacity" />

            {/* Text Overlay */}
            <div className="absolute inset-0 flex items-center justify-start p-8">
              <h3 className="font-sans text-4xl sm:text-5xl font-black text-white leading-tight uppercase max-w-[80%]">
                {collection.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
