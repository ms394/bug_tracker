import React from "react";

export default function ProjectCard({ project }) {
  return (
    <div className="card flex" key={project.project_id}>
      <div className="left-section">
        <h3>{project.project_name}</h3>
        <p>{project.project_description}</p>
      </div>
      <div className="right-section flex-col">
        <button className="primary">View Project</button>
        {project.is_admin ? (
          <button className="secondary">Add Members</button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
