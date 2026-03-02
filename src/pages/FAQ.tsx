import React from "react";

/**
 * FAQ page component
 */
const FAQ: React.FC = () => {
  const faqs = [
    {
      q: "How do you find deals?",
      a: "We aggregate deals from top retailers and update our listings frequently to bring you the best offers.",
    },
    {
      q: "Are the deals verified?",
      a: "We strive to verify all deals before publishing. However, prices and availability can change, so we recommend confirming on the retailer's site.",
    },
    {
      q: "How often are deals updated?",
      a: "Our Trending and Hot Deals sections are updated throughout the day. Check back often for new offers.",
    },
    {
      q: "Can I suggest a deal?",
      a: "Yes! Use our Contact page to send us suggestions. We review all submissions.",
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Frequently Asked Questions
      </h1>

      <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
        {faqs.map((faq, i) => (
          <details
            key={i}
            className="group p-6 hover:bg-gray-50 transition-colors"
          >
            <summary className="font-semibold text-gray-800 cursor-pointer list-none flex items-center justify-between">
              {faq.q}
              <span className="text-orange-600 group-open:rotate-180 transition-transform">
                ▼
              </span>
            </summary>
            <p className="mt-3 text-gray-600">{faq.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
