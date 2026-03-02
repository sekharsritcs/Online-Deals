import React from "react";
import { motion } from "framer-motion";

/**
 * BannerSection component props
 */
interface BannerSectionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
}

/**
 * Hero banner section with animated content
 */
const BannerSection: React.FC<BannerSectionProps> = ({
  title = "Discover Amazing Deals with WoahDeals 🎉",
  subtitle = "Save more every day — find exclusive offers and trending discounts across all categories.",
  buttonText = "Explore Deals",
  onButtonClick,
  className = "",
}) => {
  const handleButtonClick = (): void => {
    onButtonClick?.();
  };

  return (
    <section
      className={`relative bg-linear-to-r from-orange-500 via-pink-500 to-purple-600 text-white py-20 overflow-hidden ${className}`}
    >
      {/* Decorative blurred background shapes */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-pink-400 rounded-full blur-3xl opacity-25 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-700 rounded-full blur-3xl opacity-25 animate-pulse" />

      {/* Banner content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold mb-4 tracking-tight"
        >
          {title.split("WoahDeals").map((part, index) => (
            <React.Fragment key={index}>
              {part}
              {index === 0 && <span className="text-yellow-300">WoahDeals</span>}
            </React.Fragment>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <button
            onClick={handleButtonClick}
            className="px-8 py-3 bg-white text-orange-600 font-semibold rounded-full shadow-lg hover:scale-105 hover:bg-orange-100 transition-transform duration-300"
            type="button"
          >
            {buttonText}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default BannerSection;
