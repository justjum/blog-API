var express = require("express");
var router = express.Router();
const indexController = require("../controllers/indexController");

function hello(req, res, next) {
  console.log("hello");
  next();
}
/* GET home page. */
router.get("/", indexController.indexGet);

router.post("/", indexController.indexPost);

router.post("/login", hello, indexController.loginPost);

module.exports = router;
