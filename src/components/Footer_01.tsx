import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-linear-to-b from-blue-950 to-gray-900 text-gray-300 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Column 1: Brand + Description */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">WoahDeals</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Discover amazing deals and exclusive offers every day.  
            Shop smart, save more with WoahDeals!
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">Home</a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">Deals</a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">Categories</a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">Contact Us</a>
            </li>
          </ul>
        </div>

        {/* Column 3: Follow Us */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-400 transition-colors">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500">
        © {currentYear} WoahDeals. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
