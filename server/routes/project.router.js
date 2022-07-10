const express = require("express");
const projectController = require("../controllers/project.controller");
const projectDetailRouter = require("./additionalProjectData.router");

const projectRouter = express.Router();

projectRouter.post("/createProject", projectController.createProjectController);
projectRouter.get(
  "/getProjectDetails/:id",
  projectController.getProjectController
);
projectRouter.get("/getProjects", projectController.getUsersProjectsController);
projectRouter.post(
  "/addUserToProject",
  projectController.addUserToProjectController
);

// Routes for adding Additional Project Data
projectRouter.use("/addProjectData", projectDetailRouter);

module.exports = projectRouter;
