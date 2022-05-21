const express = require("express");
const projectController = require("../controllers/project.controller");

const projectRouter = express.Router();

projectRouter.post("/createProject", projectController.createProjectController);
projectRouter.get(
  "/getProjectDetails/:id",
  projectController.getProjectController
);
projectRouter.post(
  "/addUserToProject",
  projectController.addUserToProjectController
);

module.exports = projectRouter;
