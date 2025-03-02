import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
// import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./components/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { motion } from "framer-motion";
import DashboardHome from "./components/DashboardHome";
import AddBook from "./components/Addbook";
import BookList from "./components/BookList";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Router>
      <AppContent
        isModalOpen={isModalOpen}
        openModal={openModal}
        closeModal={closeModal}
        isLoginForm={isLoginForm}
        toggleForm={toggleForm}
      />
    </Router>
  );
}

// Separate component to use useLocation hook
function AppContent({ isModalOpen, openModal, closeModal, isLoginForm, toggleForm }) {
  const location = useLocation();

  // Check if the current route is the dashboard
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-blue-900 transition-colors duration-300 flex flex-col">
      {/* Conditionally render Navbar */}
      {!isDashboard && <Navbar onLoginClick={openModal} />}

      <Routes>
        {/* Home Route */}
        <Route
          path="/"
          element={
            <div className="flex-grow flex flex-col items-center justify-center p-4 min-h-[calc(100vh-64px)]">
              <motion.h1
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-6xl font-bold text-teal-600 dark:text-teal-400 mb-4 text-center"
              >
                Welcome to PrimoS
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-xl text-teal-700 dark:text-teal-300 text-center"
              >
                Your safe space for books and documents.
              </motion.p>
            </div>
          }
        />

        {/* Login Route */}
        <Route
          path="/login"
          element={
            <LoginForm
              onSwitchToRegister={() => {
                toggleForm();
                openModal();
              }}
            />
          }
        />

        {/* Register Route */}
        <Route
          path="/register"
          element={
            <RegisterForm
              onSwitchToLogin={() => {
                toggleForm();
                openModal();
              }}
            />
          }
        />

        {/* Dashboard Route (Protected) */}
        
        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<DashboardHome />} /> {/* Default page inside /dashboard */}
  <Route path="books" element={<BookList />} />
  <Route path="addbook" element={<AddBook />} /> {/* FIX: No leading slash */}
</Route>


        404 Not Found Page
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>

      {/* Conditionally render Footer */}
      {!isDashboard && <Footer />}

      {/* Login/Register Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        isLoginForm={isLoginForm}
        toggleForm={toggleForm}
      />
    </div>
  );
}

export default App;