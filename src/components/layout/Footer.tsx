import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaGithub,
  FaYoutube,
} from "react-icons/fa6";

/**
 * Footer component with copyright and social media links
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      href: "#",
      ariaLabel: "Facebook",
      icon: FaFacebookF,
      hoverColor: "hover:text-blue-500",
    },
    {
      href: "#",
      ariaLabel: "Instagram",
      icon: FaInstagram,
      hoverColor: "hover:text-pink-500",
    },
    {
      href: "#",
      ariaLabel: "X (Twitter)",
      icon: FaXTwitter,
      hoverColor: "hover:text-sky-400",
    },
    {
      href: "#",
      ariaLabel: "GitHub",
      icon: FaGithub,
      hoverColor: "hover:text-gray-200",
    },
    {
      href: "#",
      ariaLabel: "YouTube",
      icon: FaYoutube,
      hoverColor: "hover:text-red-500",
    },
  ] as const;

  return (
    <footer className="bg-orange-700 text-orange-400 py-4 rounded-b-2xl shadow-inner">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        {/* Copyright */}
        <p className="text-sm text-white text-center">
          © {currentYear} Woah Deals, Inc. All rights reserved.
        </p>

        {/* Social Media Icons */}
        <div className="flex space-x-6 text-xl">
          {socialLinks.map(({ href, ariaLabel, icon: Icon, hoverColor }) => (
            <a
              key={ariaLabel}
              href={href}
              aria-label={ariaLabel}
              className={`text-white ${hoverColor} transition-colors`}
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
