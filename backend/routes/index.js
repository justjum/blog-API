var express = require("express");
var router = express.Router();
const indexController = require("../controllers/indexController");
const postController = require("../controllers/postController");

/* GET home page. */
router.get("/", indexController.indexGet);

router.post("/", indexController.indexPost);

router.post("/post/create", postController.postPost);

router.post("/login", indexController.loginPost);

module.exports = router;
