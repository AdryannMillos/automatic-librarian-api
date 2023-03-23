const express = require("express");

const router = express.Router();
const leviathanController = require("../controller/leviathanController");

router.get("/list/event", leviathanController.event);
router.get("/list/commander", leviathanController.commander);
router.get("/list/top4", leviathanController.top4);
router.get("/list/winner", leviathanController.winner);
router.get("/list/played", leviathanController.played);

module.exports = router;
