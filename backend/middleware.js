import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(403)
        .json({ error: "Forbidden: No or invalid authorization header" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.userId) {
      req.userId = decoded.userId;
      next();
    } else {
      return res
        .status(403)
        .json({ error: "Forbidden: Invalid token payload" });
    }
  } catch (error) {
    // Handle different types of JWT errors (optional)
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Unauthorized: Token has expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(403).json({ error: "Forbidden: Token is invalid" });
    } else {
      return res
        .status(500)
        .json({ error: "Internal Server Error: Token verification failed" });
    }
  }
};

export default authMiddleware;
