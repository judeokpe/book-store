import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: "", author: "", category: "" });
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch user data and books on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token in Dashboard:", token); // Debug log

        if (!token) {
          console.log("No token found, redirecting to login");
          window.location.href = "/";
          return;
        }

        // Fetch user data
        const userResponse = await axios.get("http://localhost:9000/api/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("User data:", userResponse.data); // Debug log

        // Fetch books
        const booksResponse = await axios.get("http://localhost:9000/api/books", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Books data:", booksResponse.data); // Debug log

        setUser(userResponse.data);
        setBooks(booksResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        console.error("Error response:", err.response); // Debug log
        setError("Failed to fetch data. Please try again.");
        window.location.href = "/"; // Redirect to login on error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle adding a new book
  const handleAddBook = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found, redirecting to login");
        window.location.href = "/"; // Redirect to login if no token
        return;
      }

      const response = await axios.post(
        "http://localhost:9000/api/books",
        newBook,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBooks([...books, response.data]);
      setNewBook({ title: "", author: "", category: "" }); // Clear form
    } catch (err) {
      console.error("Error adding book:", err.response?.data || err.message);
      setError("Failed to add book. Please try again.");
    }
  };

  // Handle deleting a book
  const handleDeleteBook = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/"; // Redirect to login if no token
        return;
      }

      await axios.delete(`http://localhost:9000/api/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(books.filter((book) => book._id !== id)); // Remove book from state
    } catch (err) {
      console.error("Error deleting book:", err.response?.data || err.message);
      setError("Failed to delete book. Please try again.");
    }
  };

  // Filter books based on search query
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <p className="text-teal-700 dark:text-teal-300">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <h1 className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-6">
        Dashboard
      </h1>

      {/* Welcome Message */}
      {user && (
        <div className="mb-8">
          <p className="text-teal-700 dark:text-teal-300">
            Welcome, <span className="font-semibold">{user.username}</span>!
          </p>
          <p className="text-teal-700 dark:text-teal-300">Email: {user.email}</p>
        </div>
      )}

      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search by title, author, or category"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-gray-100"
        />
      </div>

      {/* Add Book Form */}
      <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-teal-600 dark:text-teal-400 mb-4">
          Add a New Book
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-gray-100"
          />
          <input
            type="text"
            placeholder="Author"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-gray-100"
          />
          <input
            type="text"
            placeholder="Category"
            value={newBook.category}
            onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-gray-100"
          />
          <button
            onClick={handleAddBook}
            className="w-full bg-teal-600 dark:bg-teal-700 text-white py-2 rounded-md hover:bg-teal-700 dark:hover:bg-teal-800 transition-colors duration-300"
          >
            Add Book
          </button>
        </div>
      </div>

      {/* Book List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <div
            key={book._id}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-bold text-teal-600 dark:text-teal-400 mb-2">
              {book.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              <span className="font-semibold">Author:</span> {book.author}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <span className="font-semibold">Category:</span> {book.category}
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => handleDeleteBook(book._id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300"
              >
                Delete
              </button>
              <Link
                to={`/read/${book._id}`}
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors duration-300"
              >
                Read
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;