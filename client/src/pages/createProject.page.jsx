import React, { useState, useContext } from "react";
import FormField from "../components/formField";
import { useNavigate } from "react-router-dom";
import TextAreaField from "../components/TextFied";
import Button from "../components/button";
import ProjectContext from "../context/projects/projects-context";
import { useEffect } from "react";

export default function CreateProjectPage() {
  const [projectData, setProjectData] = useState({
    project_name: "",
    project_description: "",
  });

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const { addProject, projects } = useContext(ProjectContext);

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!projectData["project_name"]) {
      alert("Project Name cannot be empty");
      return;
    }
    // Call the Create Project post Service now.
    fetch("http://localhost:5000/project/createProject", {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projectData),
    })
      .then(async (res) => {
        const response = await res.json();
        if (res.status == 201) {
          addProject(response); // calls the dispatch method to add new project to the  list of projects
          // even before the state is updated, the control is returned and user gets navigated to other page with old state
          navigate("/add-project-details", {
            state: { project: projects[projects.length - 1] },
          });
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setProjectData({
      ...projectData,
      project_name: "",
      project_description: "",
    });
  };

  return (
    <div>
      <h2>Create Project</h2>
      <div className="timeline">
        <span className="active">1</span>
        <span className="inactive">2</span>
      </div>
      {/* <h3 className="darkGrey mb-50">Basic Info</h3> */}
      <form action="POST" onSubmit={handleSubmit}>
        <div className="form-field-block">
          <FormField
            name="project_name"
            type="text"
            value={projectData["project_name"]}
            onChange={handleChange}
            label="Project Name"
          />
        </div>
        <div className="form-field-block">
          <TextAreaField
            name="project_description"
            type="text"
            label="Project Description"
            onChange={handleChange}
            value={projectData["project_description"]}
          />
        </div>
        <Button style="primary" type="submit" value="Create Project" />
      </form>
    </div>
  );
}
