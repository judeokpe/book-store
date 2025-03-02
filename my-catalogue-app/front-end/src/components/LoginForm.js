import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For frontend validation
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation (client-side only)
    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      // Send login request to the backend
      const res = await axios.post("http://localhost:9000/api/auth/login", { email, password });
      console.log("Login response:", res.data);

      // Save token in localStorage
      localStorage.setItem("token", res.data.token);
      console.log("Token saved:", res.data.token);

      // Redirect to dashboard after successful login
      navigate("/dashboard");
      console.log("Redirecting to dashboard...");
    } catch (err) {
      // Handle errors from the backend
      setError(err.response?.data?.error || "Login failed. Please try again.");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-4">
        Login
      </h2>

      {error && (
        <p className="text-red-500 text-sm text-center mb-4">{error}</p>
      )}

      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-gray-100"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-gray-100"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 dark:bg-teal-700 text-white py-2 rounded-md hover:bg-teal-700 dark:hover:bg-teal-800 transition-colors duration-300"
        >
          Login
        </button>
      </form>

      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-teal-600 dark:text-teal-400 hover:underline"
        >
          Don't have an account? Register
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
