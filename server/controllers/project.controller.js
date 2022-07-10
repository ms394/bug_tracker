const projectQueries = require("../queries/project.queries");
const userQueries = require("../queries/users.queries");
const ApiError = require("../error/api-error");
const logger = require("../logger/logger");
// Controller to create projects

const createProjectController = async (req, res, next) => {
  const { project_name, project_description } = req.body;

  if (!req.user) {
    next(ApiError.badRequest("User is not logged in."));
  } else if (!project_name) {
    next(ApiError.badRequest("Project Name is mandatory"));
  } else {
    const created_by = req.user.user_id;
    try {
      const project = await projectQueries.createProject(
        project_name,
        project_description,
        created_by
      );
      const projectUserData = await userQueries.addUserToProject(
        created_by,
        project.project_id,
        true
      );
      return res.status(201).json({
        ...projectUserData,
        ...project,
      });
    } catch (err) {
      logger.error(err);
      next(ApiError.internalServerError(err.message));
    }
  }
};

// Controller to Add User to  a Project.
const addUserToProjectController = async (req, res, next) => {
  const { user, project, is_admin } = req.body;
  try {
    await userQueries.addUserToProject(user, project, is_admin);
    return res.status(201).json({ message: `User added to project.` });
  } catch (err) {
    logger.error(err);
    next(ApiError.internalServerError(err.message));
  }
};

// Controller to get details of a project.
const getProjectController = async (req, res, next) => {
  const id = Number(req.params.projectId);
  if (!id) {
    next(ApiError.badRequest("No project id passed."));
  } else {
    try {
      const projectRows = await projectQueries.getProjectDetails(id);
      const project = projectRows.rows[0];
      return res.status(200).json(project);
    } catch (err) {
      logger.error(err);
      next(ApiError.internalServerError(err.message));
    }
  }
};

// Get all the projects that the user is a part of. Either as a creator, admin or just a member.
const getUsersProjectsController = async (req, res, next) => {
  const user = req.user.user_id;
  if (!user) next(ApiError.badRequest("No user passed"));
  const projectsRawData = await userQueries.getUsersProjects(user);
  const projects = projectsRawData.rows;
  return res.status(200).json({ projects });
};

const getUsersProjectsCompleteController = async (req, res, next) => {
  const user = req.user.user_id;
  if (!user) next(ApiError.badRequest("No user passed"));
  // Get data from user_projects
  const userProjects_raw = await userQueries.getUsersProjects(user);
  const userProjects = userProjects_raw.rows;

  // Get data from priority_projects

  // Get data from type_projects

  // Get data from status_projects

  // createdBy data from user_data

  // admins data from user_data
};

module.exports = {
  createProjectController,
  addUserToProjectController,
  getProjectController,
  getUsersProjectsController,
};
