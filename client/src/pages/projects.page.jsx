import React, { useEffect, useContext } from "react";
import ProjectCard from "../components/projectCard";
import { Link } from "react-router-dom";
import ProjectsContext from "../context/projects/projects-context";

export default function ProjectsPage() {
  const { projects, setProjects } = useContext(ProjectsContext);
  console.log(projects);
  useEffect(() => {
    fetch("http://localhost:5000/project/getProjects", {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then(async (res) => {
        const response = await res.json();
        if (res.status == 200) {
          setProjects(response.projects);
        } else {
          // Handle Error Scenario
          console.log("error");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="flex top-section">
        <h1>Your Projects</h1>
        <button className="primary">
          <Link to="/create-project">Create Project</Link>
        </button>
      </div>
      {projects.length > 0 ? (
        <div className="projects-list">
          {projects.map((project) =>
            project.project_id ? (
              <ProjectCard project={project} key={project.project_id} />
            ) : (
              ""
            )
          )}
        </div>
      ) : (
        <div className="center errorMessage">
          <h2 className="darkGrey">
            Sorry you don't have any projects to be displayed
          </h2>
          <p className="darkGrey">
            Click on Create Project button to get started.
          </p>
        </div>
      )}
    </div>
  );
}
