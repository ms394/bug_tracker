const addProjectDataQueries = require("../queries/additionalProjectDetails.queries");
const { getProjectDetails } = require("../queries/project.queries");
const ApiError = require("../error/api-error");
const logger = require("../logger/logger");

const getTypeController = async (req, res, next) => {
  try {
    const typesRawData = await addProjectDataQueries.getType();
    const types = typesRawData.rows;
    if (types.length < 1) {
      return next(ApiError.notFound("No types available with this id"));
    }
    return res.status(200).json({ types });
  } catch (err) {
    logger.error(err);
    next(ApiError.internalServerError(err));
  }
};

const getStatusController = async (req, res) => {
  try {
    const statusRawData = await addProjectDataQueries.getStatus();
    const statusData = statusRawData.rows;
    if (statusData.length < 1) {
      return next(ApiError.notFound("No status available with this id"));
    }
    return res.status(200).json({ statusData });
  } catch (err) {
    logger.error(err);
    next(ApiError.internalServerError(err));
  }
};

const getPriorityController = async (req, res, next) => {
  try {
    const priorityRawData = await addProjectDataQueries.getPriority();
    const priority = priorityRawData.rows;
    if (priority.length < 1) {
      return next(ApiError.notFound("No priority available with this id"));
    }
    return res.status(200).json({ priority });
  } catch (err) {
    logger.error(err);
    next(ApiError.internalServerError(err));
  }
};

// Create Controllers

const createTypeController = async (req, res, next) => {
  const { project, type_value } = req.body;
  if (!type_value) {
    return next(ApiError.badRequest("No value passed for Type"));
  } else {
    try {
      const type = await addProjectDataQueries.createType(type_value);
      await addProjectDataQueries.addTypeToProject(project, type);
      return res.status(201).json({ type });
    } catch (err) {
      logger.error(err);
      next(ApiError.internalServerError(err));
    }
  }
};

const createStatusController = async (req, res, next) => {
  const { project, status_value } = req.body;
  if (!status_value) {
    return next(ApiError.badRequest("No value passed for Status"));
  } else {
    try {
      const status = await addProjectDataQueries.createStatus(status_value);
      await addProjectDataQueries.addStatusToProject(project, status);
      return res.status(201).json({ status });
    } catch (err) {
      logger.error(err);
      next(ApiError.internalServerError(err));
    }
  }
};

const createPriorityController = async (req, res, next) => {
  const { project, value } = req.body;
  if (!value) {
    return next(ApiError.badRequest("No value passed for Priority"));
  } else {
    try {
      const { priority_id, priority_value } =
        await addProjectDataQueries.createPriority(value);
      console.log(priority_id, priority_value);
      const priority_project = await addProjectDataQueries.addPriorityToProject(
        project,
        priority_id
      );
      return res.status(201).json({
        id: priority_project["id"],
        project: priority_project["project"],
        priority_id,
        priority_value,
      });
    } catch (err) {
      logger.error(err);
      next(ApiError.internalServerError(err));
    }
  }
};

// Controllers to add priority, type, status to the project
const addTypeToProjectController = async (req, res, next) => {
  const { project, type } = req.body;
  if (!project || !type) {
    return next(ApiError.badRequest("No value passed for Type or Project"));
  }
  try {
    await addProjectDataQueries.addTypeToProject(project, type);
    return res.status(200).json({ message: "Type is added to the Project" });
  } catch (err) {
    logger.error(err);
    next(ApiError.internalServerError(err));
  }
};

const addPriorityToProjectController = async (req, res, next) => {
  const { project, priority } = req.body;

  if (!project || !priority) {
    return next(ApiError.badRequest("No value passed for Priority or Project"));
  }
  try {
    const priority_project = await addProjectDataQueries.addPriorityToProject(
      project,
      priority
    );
    return res.status(200).json(priority_project);
  } catch (err) {
    logger.error(err);
    next(ApiError.internalServerError(err));
  }
};

const addStatusToProjectController = async (req, res, next) => {
  const { project, status } = req.body;
  if (!project || !status) {
    return next(ApiError.badRequest("No value passed for Status or Project"));
  }

  try {
    await addProjectDataQueries.addStatusToProject(status, project);
    return res
      .status(200)
      .json({ messsage: "The status has been added to the project" });
  } catch (err) {
    logger.error(err);
    next(ApiError.internalServerError(err));
  }
};

// Search Status
const searchStatusController = async (req, res, next) => {
  const { str } = req.body;
  if (!str) {
    return next(ApiError.badRequest("No value passed"));
  }
  try {
    const raw_status_values = await addProjectDataQueries.searchStatus(str);
    const status_values = raw_status_values.rows;
    return res.status(200).json(status_values);
  } catch (err) {
    logger.error(err);
    next(ApiError.internalServerError(err));
  }
};

// Search priority
const searchPriorityController = async (req, res, next) => {
  const { str } = req.body;
  if (!str) {
    return next(ApiError.badRequest("No value passed"));
  }
  try {
    const raw_priority_values = await addProjectDataQueries.searchPriority(str);
    const priority_values = raw_priority_values.rows;
    return res.status(200).json(priority_values);
  } catch (err) {
    logger.error(err);
    next(ApiError.internalServerError(err));
  }
};

const searchTypeController = async (req, res, next) => {
  const { str } = req.body;
  if (!str) {
    return next(ApiError.badRequest("No value passed"));
  }
  try {
    const raw_type_values = await addProjectDataQueries.searchType(str);
    const type_values = raw_type_values.rows;
    return res.status(200).json(type_values);
  } catch (err) {
    logger.error(err);
    next(ApiError.internalServerError(err));
  }
};

const getProjectData = async (req, res, next) => {
  const project = req.query.project_id;
  await getProjectDetails(project);
};

module.exports = {
  getPriorityController,
  getStatusController,
  getTypeController,
  createPriorityController,
  createStatusController,
  createTypeController,
  addStatusToProjectController,
  addPriorityToProjectController,
  addTypeToProjectController,
  searchStatusController,
  searchPriorityController,
  searchTypeController,
  getProjectData,
};
