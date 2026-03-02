import React from "react";

/**
 * Contact page component
 */
const Contact: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h1>

      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        <p className="text-gray-700">
          Have questions or feedback? We'd love to hear from you. Get in touch
          with the Woah Deals team.
        </p>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Email</h2>
          <a
            href="mailto:support@woahdeals.com"
            className="text-orange-600 hover:text-orange-700 font-medium"
          >
            support@woahdeals.com
          </a>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Business Inquiries
          </h2>
          <a
            href="mailto:partners@woahdeals.com"
            className="text-orange-600 hover:text-orange-700 font-medium"
          >
            partners@woahdeals.com
          </a>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Response Time
          </h2>
          <p className="text-gray-700">
            We typically respond within 24–48 business hours.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Contact;
