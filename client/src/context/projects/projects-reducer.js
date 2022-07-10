import { SET_PROJECTS, ADD_PROJECT, ADD_PRIORITY } from "./projects-actions";
import { getProjectObj, addPriorityToProject } from "./project-util";
import Project from "./project-class";

const projectsReducer = (state, action) => {
  switch (action.type) {
    case SET_PROJECTS:
      const projectObjs = [];

      // Create  project objects and add it in the projects array
      for (const project of action.payload) {
        const projectObj = getProjectObj(project);
        projectObjs.push(projectObj);
      }

      return {
        projects: [...projectObjs],
      };
    case ADD_PROJECT:
      // create Project Object
      const projectObj = getProjectObj(action.payload);
      console.log(projectObj);
      return {
        projects: [...state.projects, projectObj],
      };
    case ADD_PRIORITY:
      let projects = addPriorityToProject(action.payload, state.projects);
      console.log(projects);
      return {
        ...state,
        project: [...projects],
      };
    default:
      return state;
  }
};

export default projectsReducer;
