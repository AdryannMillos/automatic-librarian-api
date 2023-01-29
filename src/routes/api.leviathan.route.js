const express = require("express");

const router = express.Router();
const leviathanController = require("../controller/leviathanController");

router.get("/list", leviathanController.index);

module.exports = router;
