import React from "react";
import { motion } from "framer-motion";
import Logo from '../assets/My_logo.jpg';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1.5 }}
      className="bg-gray-200 dark:bg-gray-700 py-8 text-center transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo and Text */}
          <div className="flex items-center mb-4 md:mb-0">
            <img src= {Logo} alt="PrimoS Logo" className="h-10 mr-2" />
            <p className="text-gray-700 dark:text-gray-300">
              Created by <span className="font-semibold">Okonkwo Makuochukwu</span>
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-4">
            <a
              href="https://twitter.com/your-twitter"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-300"
            >
              <img
                src="/twitter-icon.png"
                alt="Twitter"
                className="h-6 w-6"
              />
            </a>
            <a
              href="https://linkedin.com/in/your-linkedin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-300"
            >
              <img
                src="/linkedin-icon.png"
                alt="LinkedIn"
                className="h-6 w-6"
              />
            </a>
            <a
              href="https://facebook.com/your-facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-300"
            >
              <img
                src="/facebook-icon.png"
                alt="Facebook"
                className="h-6 w-6"
              />
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;