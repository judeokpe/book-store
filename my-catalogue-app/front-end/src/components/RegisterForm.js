import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterForm = ({ onSwitchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      // Send registration request to the backend
      await axios.post("http://localhost:9000/api/auth/register", {
        username: name, // Assuming the backend expects "username" instead of "name"
        email,
        password,
      });

      // Handle successful registration
      setSuccess("Registration successful! Redirecting to login...");
      setError("");

      // Redirect to login after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Redirect after 2 seconds
    } catch (err) {
      // Handle errors from the backend
      console.error("Registration error:", err.response?.data); // Debugging
      setError(err.response?.data?.error || "Registration failed. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-6">
        Register
      </h2>

      {error && (
        <p className="text-red-500 text-sm text-center mb-4">{error}</p>
      )}

      {success && (
        <p className="text-green-500 text-sm text-center mb-4">{success}</p>
      )}

      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-gray-100"
            placeholder="Enter your name"
            required
          />
        </div>
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
          Register
        </button>
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-teal-600 dark:text-teal-400 hover:underline"
          >
            Already have an account? Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;