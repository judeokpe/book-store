const express = require("express");
const { getBooks, addBook, deleteBook } = require("../controller/bookController");
const upload = require("../middleware/multerConfig");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Get books
router.get("/", authMiddleware, getBooks);

// Add a book (with file upload & cover extraction)
router.post("/", authMiddleware, upload.single("pdf"), addBook);


// Delete a book
router.delete("/:id", authMiddleware, deleteBook);

module.exports = router;
