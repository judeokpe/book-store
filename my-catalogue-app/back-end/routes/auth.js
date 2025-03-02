const express = require('express');
const router = express.Router();
const { register, login,getUser } = require('../controller/authController');
const authMiddleware = require('../middleware/auth');
const { forgotPassword, resetPassword } = require('../controller/passwordController');
const { getBooks, addBook, deleteBook } = require("../controller/bookController");


router.get('/user', authMiddleware, getUser)

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Forgot password route
router.post('/forgot-password', forgotPassword);

// Reset password route
router.post('/reset-password/:token', resetPassword);

router.get("/", authMiddleware, getBooks);

// Add a new book
router.post("/", authMiddleware, addBook);

// Delete a book
router.delete("/:id", authMiddleware, deleteBook);


module.exports = router;