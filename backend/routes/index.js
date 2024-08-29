var express = require("express");
var router = express.Router();
const indexController = require("../controllers/indexController");
const postController = require("../controllers/postController");
const verifyToken = require("../config/jwtauth");

/* GET home page. */
router.get("/", indexController.indexGet);

router.post("/", indexController.indexPost);

router.post("/post/create", verifyToken, postController.postPost);

router.post("/login", indexController.loginPost);

// Token verification (as per video)
// function verifyToken(req, res, next) {
//   console.log("this");
//   // Get auth header value
//   const bearerHeader = req.headers["authorization"];
//   // Check if not bearer is undefined
//   if (typeof bearerHeader !== "undefined") {
//   } else {
//     res.sendStatus(403);
//   }
// }

module.exports = router;
