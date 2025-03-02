import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-white p-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <nav className="space-y-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `block p-3 rounded-lg transition ${
              isActive ? "bg-teal-500" : "hover:bg-gray-700"
            }`
          }
        >
          📚 All Books
        </NavLink>
        <NavLink
          to="/addbook"
          className={({ isActive }) =>
            `block p-3 rounded-lg transition ${
              isActive ? "bg-teal-500" : "hover:bg-gray-700"
            }`
          }
        >
          ➕ Add Book
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
