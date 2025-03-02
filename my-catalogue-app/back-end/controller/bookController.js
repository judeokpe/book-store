const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const poppler = require("pdf-poppler");
const Book = require("../models/Book");

// Helper function to extract and resize cover image
const extractCoverImage = async (pdfPath, outputDir) => {
  try {
    const outputImage = path.join(outputDir, "cover.png");

    // Convert PDF to image (first page only)
    await poppler.convert(pdfPath, {
      format: "png",
      out_dir: outputDir,
      out_prefix: "cover",
      page: 1,
    });

    const convertedImagePath = path.join(outputDir, "cover-1.png");
    if (!fs.existsSync(convertedImagePath)) {
      throw new Error("PDF conversion failed. Image not found.");
    }
   

    // Resize the image using sharp
    const resizedImagePath = convertedImagePath.replace(".png", "-resized.png");
    await sharp(convertedImagePath).resize(200, 250).toFile(resizedImagePath);

    // Delete the original image
    fs.unlinkSync(convertedImagePath);

    return `/uploads/cover-resized.png`;
  } catch (error) {
    console.error("Error extracting cover image:", error);
    return null;
  }
};

// Get all books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find({ user: req.user.id });
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Add a book
const addBook = async (req, res) => {
  const { title, author, category } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "PDF file is required" });
  }

  try {
    const pdfPath = req.file.path;
    const coverImageUrl = await extractCoverImage(pdfPath, "uploads/");

    if (!coverImageUrl) {
      return res.status(500).json({ message: "Failed to generate cover image" });
    }

    const newBook = new Book({
      title,
      author,
      category,
      pdfUrl: `/uploads/${req.file.filename}`,
      coverImageUrl,
      user: req.user.id,
    });

    const savedBook = await newBook.save();
    res.json(savedBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a book (Removes PDF & Cover Image)
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Delete the PDF file
    const pdfPath = path.join(__dirname, "..", book.pdfUrl);
    if (fs.existsSync(pdfPath)) fs.unlinkSync(pdfPath);

    // Delete the cover image
    const coverPath = path.join(__dirname, "..", book.coverImageUrl);
    if (fs.existsSync(coverPath)) fs.unlinkSync(coverPath);

    // Remove the book record
    await book.deleteOne();

    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getBooks, addBook, deleteBook };
