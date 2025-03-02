import React from "react";
import { Outlet, useNavigate, NavLink } from "react-router-dom";

const DashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    navigate("/"); // Redirect to homepage
  };

  return (
    <div className="flex min-h-screen bg-blue-50 dark:bg-blue-900">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <nav className="flex-grow">
          <ul className="space-y-4">
            <li>
              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) =>
                  `block py-2 px-4 rounded ${isActive ? "bg-teal-500" : "hover:bg-blue-700"}`
                }
              >
                📊 Dashboard Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/books"
                className={({ isActive }) =>
                  `block py-2 px-4 rounded ${isActive ? "bg-teal-500" : "hover:bg-blue-700"}`
                }
              >
                📚 Book List
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/addbook"
                className={({ isActive }) =>
                  `block py-2 px-4 rounded ${isActive ? "bg-teal-500" : "hover:bg-blue-700"}`
                }
              >
                ➕ Add Book
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-auto bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-grow p-4">
        <Outlet /> {/* This will render the nested routes */}
      </div>
    </div>
  );
};

export default DashboardLayout;
