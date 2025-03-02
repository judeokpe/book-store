// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AddBook = () => {
//   const [title, setTitle] = useState("");
//   const [author, setAuthor] = useState("");
//   const [category, setCategory] = useState("");
//   const [coverImageUrl, setCoverImageUrl] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
  
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     const token = localStorage.getItem("token");

//     try {
//       const response = await fetch("http://localhost:9000/api/book", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ title, author, category, coverImageUrl }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to add book");
//       }

//       navigate("/"); // Redirect back to book list
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">➕ Add a New Book</h2>

//       {error && <p className="text-red-500 text-sm">{error}</p>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block font-semibold text-gray-700">Title</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-semibold text-gray-700">Author</label>
//           <input
//             type="text"
//             value={author}
//             onChange={(e) => setAuthor(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-semibold text-gray-700">Category</label>
//           <input
//             type="text"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-semibold text-gray-700">Cover Image URL</label>
//           <input
//             type="text"
//             value={coverImageUrl}
//             onChange={(e) => setCoverImageUrl(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
//             placeholder="Optional"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 transition"
//           disabled={loading}
//         >
//           {loading ? "Adding..." : "Add Book"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddBook;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [pdfFile, setPdfFile] = useState(null); // Handle PDF file upload
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!pdfFile) {
      setError("PDF file is required");
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("category", category);
    formData.append("pdf", pdfFile); // Append PDF file

    try {
      const response = await fetch("http://localhost:9000/api/book", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }, // No need for "Content-Type", FormData sets it automatically
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add book");
      }

      navigate("/dashboard/books"); // Redirect back to book list
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">➕ Add a New Book</h2>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Upload PDF</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdfFile(e.target.files[0])}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 transition"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
