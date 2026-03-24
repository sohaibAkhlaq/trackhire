const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization') || req.headers['authorization'];

    if (!authHeader) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    // Handle both "Bearer <token>" and just "<token>"
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7)
      : authHeader;

    if (!token || token === 'null' || token === 'undefined') {
      return res.status(401).json({ error: 'Access denied. Invalid token format.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    console.log('Auth middleware - User authenticated:', req.userId);
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    res.status(401).json({ error: 'Invalid or expired token.' });
  }
};