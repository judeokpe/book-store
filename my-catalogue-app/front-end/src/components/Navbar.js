import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Import Link
import Logo from '../assets/My_logo.jpg';

const Navbar = ({ onLoginClick }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-teal-600 dark:bg-teal-800 bg-opacity-90 dark:bg-opacity-90 p-4 flex justify-between items-center shadow-md backdrop-blur-sm transition-colors duration-300"
    >
      <div className="flex items-center">
        <Link to="/"> {/* Wrap the logo with Link */}
          <img src= {Logo} alt="PrimoS Logo" className="h-10 mr-2" />
        </Link>
        <span className="text-xl font-bold text-white dark:text-gray-100 transition-colors duration-300">
          PrimoS
        </span>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleDarkMode}
          className="p-2 bg-teal-500 dark:bg-teal-700 rounded-full transition-colors duration-300"
        >
          {darkMode ? "🌙" : "☀️"}
        </button>
        <button
          onClick={onLoginClick}
          className="px-4 py-2 bg-white dark:bg-gray-100 text-teal-600 dark:text-teal-800 hover:bg-gray-100 dark:hover:bg-gray-200 rounded-md transition-colors duration-300"
        >
          Login
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;