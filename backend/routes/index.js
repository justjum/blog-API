var express = require("express");
var router = express.Router();
const indexController = require("../controllers/indexController");

/* GET home page. */
router.get("/", indexController.indexGet);

router.post("/", indexController.indexPost);

module.exports = router;
