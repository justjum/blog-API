const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    // Split at the space
    const bearer = token.split(" ");
    console.log(bearer[1]);
    const decoded = jwt.verify(bearer[1], "secretthree");
    console.log(decoded);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = verifyToken;
