// import React, { useEffect, useState } from "react";

// const DashboardHome = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const token = localStorage.getItem("token"); // Get token for authentication
//         const response = await fetch("http://localhost:9000/api/book", {
//           headers: { Authorization: `Bearer ${token}` }, // Send token in headers
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch books");
//         }

//         const data = await response.json();
//         setBooks(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBooks();
//   }, []);

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
//         📚 Your Book Collection
//       </h2>

//       {/* Loading State */}
//       {loading && <p className="text-center text-gray-600">Loading books...</p>}

//       {/* Error State */}
//       {error && <p className="text-center text-red-500">{error}</p>}

//       {/* Books Grid */}
//       {!loading && !error && books.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {books.map((book) => (
//             <div
//               key={book._id}
//               className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition duration-300"
//             >
//               <img
//                 src={book.coverImageUrl || "https://via.placeholder.com/150"}
//                 alt={book.title}
//                 className="w-full h-48 object-cover rounded-md"
//               />
//               <h3 className="text-xl font-semibold mt-2">{book.title}</h3>
//               <p className="text-gray-600">by {book.author}</p>
//               <p className="text-sm text-gray-500">Category: {book.category}</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         !loading && <p className="text-center text-gray-500">No books found.</p>
//       )}
//     </div>
//   );
// };

// export default DashboardHome;


import React from "react";
import Sidebar from "./SideBar";
import BookList from "./BookList";

const DashboardHome = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}


      {/* Main Content */}
      <div className="flex-grow p-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          📚 Your Book Collection
        </h2>
    
      </div>
    </div>
  );
};

export default DashboardHome;
