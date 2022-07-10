const express = require("express");
const projectDataController = require("../controllers/addtionalProjectData.controller");

const projectDetailRouter = express.Router();

// Get Routes
projectDetailRouter.get("/getTypes", projectDataController.getTypeController);
projectDetailRouter.get(
  "/getStatus",
  projectDataController.getStatusController
);
projectDetailRouter.get(
  "/getPriority",
  projectDataController.getPriorityController
);

// Post Routes
projectDetailRouter.post(
  "/createType",
  projectDataController.createTypeController
);
projectDetailRouter.post(
  "/createStatus",
  projectDataController.createStatusController
);
projectDetailRouter.post(
  "/createPriority",
  projectDataController.createPriorityController
);

// Add types,statuses,priorities routes
projectDetailRouter.post(
  "/addTypeToProject",
  projectDataController.addTypeToProjectController
);
projectDetailRouter.post(
  "/addStatusToProject",
  projectDataController.addStatusToProjectController
);
projectDetailRouter.post(
  "/addPriorityToProject",
  projectDataController.addPriorityToProjectController
);
projectDetailRouter.post(
  "/searchStatus",
  projectDataController.searchStatusController
);
projectDetailRouter.post(
  "/searchPriority",
  projectDataController.searchPriorityController
);

projectDetailRouter.get(
  "/getProjectData",
  projectDataController.getProjectData
);

module.exports = projectDetailRouter;
