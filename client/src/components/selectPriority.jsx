import React, { useContext, useState } from "react";
import ProjectsContext from "../context/projects/projects-context";
import Button from "./button";
import FormField from "./formField";
import Tags from "./Tags";

export default function SelectPriority({ project }) {
  console.log(project);
  const [results, setResults] = useState({ input: "", data: [] });

  const { addPriority } = useContext(ProjectsContext);

  const handleClick = (priority_id, priority_value) => {
    const data = { project: project.project_id, priority: priority_id };
    fetch("http://localhost:5000/project/addProjectData/addPriorityToProject", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        const response = await res.json();
        if (res.status == 200) {
          console.log(response);
          addPriority({
            id: response["id"],
            project: response["project"],
            priority_id,
            priority_value,
          });
          setResults({ input: "", data: [] });
          alert("Priority is added.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removePriority = (e) => {
    console.log(e.target.id);
  };

  const createPriority = () => {
    console.log(results["input"]);
    const data = {
      project: project.project_id,
      value: results["input"],
    };
    fetch("http://localhost:5000/project/addProjectData/createPriority", {
      method: "POST",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        const response = await res.json();
        console.log(response);
        if (res.status == 201) {
          setResults({ input: "", data: [] });
          addPriority({
            ...response,
          });
          alert("Priority is added.");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    const data = { str: e.target.value };
    setResults({
      ...results,
      input: e.target.value,
    });
    if (e.target.value) {
      fetch("http://localhost:5000/project/addProjectData/searchPriority", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then(async (res) => {
          const response = await res.json();
          setResults({
            ...results,
            input: e.target.value,
            data: [...response],
          });
        })
        .catch((err) => console.log(err));
    } else {
      setResults({ input: "", data: [] });
    }
  };

  const renderElement = () => {
    if (!results["input"]) {
      return "";
    }

    if (results["data"].length > 0) {
      return (
        <div className="results">
          <ul>
            {results["data"].map((result) => (
              <li
                key={result.priority_id}
                id={result.priority_id}
                onClick={() =>
                  handleClick(result.priority_id, result.priority_value)
                }
              >
                {result.priority_value}
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      return (
        <div className="no-results">
          <p>
            No priority value found. You can create it by clicking on the Create
            button.
          </p>
          <Button
            type="submit"
            value="Create"
            style="secondary"
            onClick={createPriority}
          />
        </div>
      );
    }
  };

  return (
    <div>
      <h4>Add Priority values to your project</h4>
      <div className="search">
        <FormField
          type="search"
          name="priority-search"
          id="priority-search"
          value={results["input"]}
          placeholder="Search for Priority values"
          onChange={handleChange}
        />
        <div className="resultSection">{renderElement()}</div>
        <Tags
          title="Selected Priorities"
          tags={[
            { priroity_id: 3, priority_value: "P1" },
            { priroity_id: 2, priority_value: "P2" },
          ]}
          id="priroity_id"
          value="priority_value"
          removeTag={removePriority}
        />
      </div>
    </div>
  );
}
