import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers("Authorization");
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid Token" });
  }
};
