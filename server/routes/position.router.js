const express = require("express");
const getAllPositions = require("../controllers/position.controller");

const positionRouter = express.Router();

positionRouter.get("/getPositions", getAllPositions);

module.exports = positionRouter;
