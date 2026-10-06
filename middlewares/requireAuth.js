import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'elandalus_jwt_secret_key_2026';

/**
 * Express middleware that reads the Authorization header,
 * verifies the Bearer JWT using jsonwebtoken,
 * attaches decoded payload to req.user,
 * and returns 401 if authentication fails.
 */
export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: 'Access denied: Authorization header is missing',
    });
  }

  const parts = authHeader.trim().split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer' || !parts[1]) {
    return res.status(401).json({
      error: 'Access denied: Authorization header format must be "Bearer <token>"',
    });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Access denied: Invalid or expired token',
      details: error.message,
    });
  }
};

export default requireAuth;
