import React from "react";

/**
 * About page component
 */
const About: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">About Woah Deals</h1>
      
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <p className="text-gray-700">
          Welcome to Woah Deals, your one-stop destination for discovering amazing deals
          and discounts across all categories.
        </p>
        
        <p className="text-gray-700">
          We help you save money every day by finding exclusive offers and trending
          discounts from top retailers.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
          Our Mission
        </h2>
        <p className="text-gray-700">
          To help consumers discover the best deals and save money on their favorite
          products and services.
        </p>
      </div>
    </div>
  );
};

export default About;
