const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  console.log(req.header("Authorization"));
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    console.log(token);
    const decoded = jwt.verify(token, "secretthree");
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = verifyToken;
