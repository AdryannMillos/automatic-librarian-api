const express = require("express");
const router = express.Router();
const leviathanController = require("../controller/leviathanController")
// 

router.get(
    "/",
    leviathanController.compare
  );

  router.get(
    "/list",
    leviathanController.filter
  );  

  module.exports = router;
