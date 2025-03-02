// // import React, { useEffect, useState } from "react";

// // const BookList = () => {
// //   const [books, setBooks] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     fetchBooks();
// //   }, []);

// //   const fetchBooks = async () => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       const response = await fetch("http://localhost:9000/api/book", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });

// //       if (!response.ok) {
// //         throw new Error("Failed to fetch books");
// //       }

// //       const data = await response.json();
// //       setBooks(data);
// //     } catch (err) {
// //       setError(err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       const response = await fetch(`http://localhost:9000/api/book/${id}`, {
// //         method: "DELETE",
// //         headers: { Authorization: `Bearer ${token}` },
// //       });

// //       if (!response.ok) {
// //         throw new Error("Failed to delete book");
// //       }

// //       setBooks(books.filter((book) => book._id !== id));
// //     } catch (err) {
// //       alert(err.message);
// //     }
// //   };

// //   return (
// //     <div>
// //       {loading && <p className="text-center text-gray-600">Loading books...</p>}
// //       {error && <p className="text-center text-red-500">{error}</p>}

// //       {!loading && !error && books.length > 0 ? (
// //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
// //           {books.map((book) => (
// //             <div
// //               key={book._id}
// //               className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition duration-300 relative"
// //             >
// //               <img
// //                 src={book.coverImageUrl || "https://via.placeholder.com/150"}
// //                 alt={book.title}
// //                 className="w-full h-48 object-cover rounded-md"
// //               />
// //               <h3 className="text-xl font-semibold mt-2">{book.title}</h3>
// //               <p className="text-gray-600">by {book.author}</p>
// //               <p className="text-sm text-gray-500">Category: {book.category}</p>

// //               {/* Delete Button */}
// //               <button
// //                 onClick={() => handleDelete(book._id)}
// //                 className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-700 transition"
// //               >
// //                 ❌
// //               </button>
// //             </div>
// //           ))}
// //         </div>
// //       ) : (
// //         !loading && <p className="text-center text-gray-500">No books found.</p>
// //       )}
// //     </div>
// //   );
// // };

// // export default BookList;


// import React, { useEffect, useState } from "react";

// const BookList = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const fetchBooks = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch("http://localhost:9000/api/book", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch books");
//       }

//       const data = await response.json();
//       setBooks(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(`http://localhost:9000/api/book/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to delete book");
//       }

//       setBooks(books.filter((book) => book._id !== id));
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   return (
//     <div>
//       {loading && <p className="text-center text-gray-600">Loading books...</p>}
//       {error && <p className="text-center text-red-500">{error}</p>}

//       {!loading && !error && books.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {books.map((book) => (
//             <div
//               key={book._id}
//               className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition duration-300 relative"
//             >
//               <img
//                 src={
//                   book.coverImageUrl
//                     ? `http://localhost:9000${book.coverImageUrl}`
//                     : "https://images.pexels.com/photos/27168459/pexels-photo-27168459/free-photo-of-a-clock-tower-is-in-the-foreground-of-a-blurry-photo.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
//                 }
//                 alt={book.title}
//                 className="w-full h-48 object-cover rounded-md"
//               />
//               <h3 className="text-xl font-semibold mt-2">{book.title}</h3>
//               <p className="text-gray-600">by {book.author}</p>
//               <p className="text-sm text-gray-500">Category: {book.category}</p>

//               {/* Delete Button */}
//               <button
//                 onClick={() => handleDelete(book._id)}
//                 className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-700 transition"
//               >
//                 ❌
//               </button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         !loading && <p className="text-center text-gray-500">No books found.</p>
//       )}
//     </div>
//   );
// };

// export default BookList;
import React, { useEffect, useState } from "react";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:9000/api/book", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(response)

      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }

      const data = await response.json();
      setBooks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:9000/api/book/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to delete book");
      }

      setBooks(books.filter((book) => book._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      {loading && <p className="text-center text-gray-600">Loading books...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition duration-300 relative"
            >
              
              <img
                // src={
                //   book.coverImageUrl
                //     ? `http://localhost:9000/uploads/${book.coverImageUrl}`
                //     : "{https://images.pexels.com/photos/27168459/pexels-photo-27168459/free-photo-of-a-clock-tower-is-in-the-foreground-of-a-blurry-photo.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2}"
                // }
                src={`http://localhost:9000/uploads/cover-001.png`}
                alt={book.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-xl font-semibold mt-2">{book.title}</h3>
              <p className="text-gray-600">by {book.author}</p>
              <p className="text-sm text-gray-500">Category: {book.category}</p>

              {/* Download Button */}
              <a
                href={`http://localhost:9000${book.pdfUrl}`}
                download
                className="mt-2 block text-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
              >
                📥 Download PDF
              </a>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(book._id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-700 transition"
              >
                ❌
              </button>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p className="text-center text-gray-500">No books found.</p>
      )}
    </div>
  );
};

export default BookList;
