import React from "react";
import { useParams } from "react-router-dom";

const BookReader = ({ books }) => {
  const { id } = useParams();
  const book = books[parseInt(id)];

  if (!book) {
    return <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">Book not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <h1 className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-6">
        {book.title}
      </h1>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        <span className="font-semibold">Author:</span> {book.author}
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        <span className="font-semibold">Category:</span> {book.category}
      </p>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <p className="text-gray-700 dark:text-gray-300">
          This is a placeholder for the book content. In a real app, you would fetch the book content from a database or API.
        </p>
      </div>
    </div>
  );
};

export default BookReader;