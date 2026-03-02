import React, { useState } from "react";
import { motion } from "framer-motion";

const ModernNewsletter: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = () => {
    if (email.trim()) {
      // You can replace this with your API call
      console.log("Subscribed with:", email);
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <div className="flex items-center justify-center bg-linear-to-br from-orange-400 via-pink-500 to-purple-700 text-white">
      {/* Decorative blur shapes */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-pink-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-lg w-full bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl text-center border border-white/20"
      >
        <h1 className="text-4xl font-bold mb-4">Join Our Newsletter</h1>
        <p className="text-white/80 mb-8">
          Subscribe now and get exclusive deals, updates, and insider discounts
          delivered straight to your inbox!
        </p>

        {!submitted ? (
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-5 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-gray-500"
            />
            <button
              onClick={handleSubscribe}
              className="px-6 py-3 bg-white text-pink-600 font-semibold rounded-full hover:bg-pink-50 transition-all transform hover:scale-105"
            >
              Subscribe
            </button>
          </div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-300 font-semibold mt-6"
          >
            🎉 Thank you for subscribing!
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default ModernNewsletter;
