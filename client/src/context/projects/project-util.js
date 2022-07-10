import Project from "./project-class";

export const getProjectObj = (project) => {
  const {
    id,
    project_id,
    project_name,
    project_description,
    created_by,
    is_admin,
  } = project;
  const projectObj = new Project(
    id,
    project_id,
    project_name,
    project_description,
    created_by,
    is_admin
  );

  return projectObj;
};

export const addPriorityToProject = (payload, projects) => {
  for (const project of projects) {
    if (project.project_id == payload["project"]) {
      project.addPriority(payload);
      break;
    }
  }

  return projects;
};

export const addStatusToProject = (status, project_id, projects) => {
  const [project] = projects.filter(
    (project) => project.project_id == project_id
  );
  project.addProjectDetails.statuses.push(status);
};

export const addTypeToProject = (type, project_id, projects) => {
  const [project] = projects.filter(
    (project) => project.project_id == project_id
  );
  project.addProjectDetails.types.push(type);
};
