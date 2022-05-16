const { createProject, addUserProject, getProject } = require("../queries");

const createProjectController = async (req, res) => {
  const { project_name, project_description } = req.body;

  if (!req.user) {
    return res.status(400).json({ message: "User is not logged in." });
  } else {
    const created_by = req.user.id;
    try {
      const project = await createProject(
        project_name,
        project_description,
        created_by
      );
      const data = await addUserProjectUtil(req.user.id, project, true);
      if (data.status == "failure") throw data.message;
      return res.status(201).json({ message: "Project Created", id: project });
    } catch (err) {
      console.log(err);
      return res.status(400).send(err);
    }
  }
};

const addUserToProjectController = async (req, res) => {
  const { user, project, is_admin } = req.body;
  try {
    const data = await addUserProjectUtil(user, project, is_admin);
    if (data.status == "failure") throw data.message;
    console.log(req.user);
    return res.status(201).json({ message: `User added to project.` });
  } catch (err) {
    return res.status(400).send(err);
  }
};

const getProjectController = async (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.send(400).json({ message: "No id passed" });
  } else {
    try {
      const projectRows = await getProject(id);
      const project = projectRows.rows[0];
      return res.status(200).json(project);
    } catch (err) {
      console.log(err);
      return res.status(400).send(err);
    }
  }
};

const addUserProjectUtil = async (user, project, is_admin) => {
  if (!user) {
    return "User is not present";
  } else {
    try {
      await addUserProject(user, project, is_admin);
      return { status: "success", msg: "Entry Created" };
    } catch (err) {
      console.log(err);
      return { status: "failure", msg: err };
    }
  }
};

module.exports = {
  createProjectController,
  addUserToProjectController,
  getProjectController,
};
