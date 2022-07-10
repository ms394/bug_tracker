import { useEffect, useReducer } from "react";
import { SET_PROJECTS, ADD_PROJECT, ADD_PRIORITY } from "./projects-actions";
import projectsReducer from "./projects-reducer";
import ProjectsContext from "./projects-context";

const ProjectsState = (props) => {
  const initialState = {
    projects: [],
  };

  const [state, dispatch] = useReducer(projectsReducer, initialState);

  const setProjects = (projects) => {
    dispatch({
      type: SET_PROJECTS,
      payload: projects,
    });
  };

  const addProject = (project) => {
    return dispatch({
      type: ADD_PROJECT,
      payload: project,
    });
  };

  const addPriority = (priorityObj) => {
    dispatch({
      type: ADD_PRIORITY,
      payload: priorityObj,
    });
  };

  return (
    <ProjectsContext.Provider
      value={{ projects: state.projects, addProject, setProjects, addPriority }}
    >
      {props.children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsState;
