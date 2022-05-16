const express = require("express");
const {
  createProjectController,
  getProjectController,
  addUserToProjectController,
} = require("../controllers/project.controller");

const projectRouter = express.Router();

projectRouter.post("/createProject", createProjectController);
projectRouter.get("/getProjectDetails/:id", getProjectController);
projectRouter.post("/addUserToProject", addUserToProjectController);

module.exports = projectRouter;
