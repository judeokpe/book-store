import React from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Modal = ({ isOpen, onClose, isLoginForm, toggleForm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md mx-4">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
        >
          &times;
        </button>
        {isLoginForm ? (
          <LoginForm onSwitchToRegister={toggleForm} />
        ) : (
          <RegisterForm onSwitchToLogin={toggleForm} />
        )}
      </div>
    </div>
  );
};

export default Modal;