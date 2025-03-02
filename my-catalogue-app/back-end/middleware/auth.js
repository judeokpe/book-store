const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // If no token is provided, return an error
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user data to the request object
    req.user = decoded; // This includes the user ID and any other data in the token payload

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Handle invalid or expired tokens
    res.status(400).json({ error: 'Invalid or expired token.' });
  }
};

module.exports = authMiddleware;