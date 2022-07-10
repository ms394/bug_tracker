import React, { useState } from "react";
import SelectPriority from "../components/selectPriority";

import { useLocation } from "react-router-dom";

export default function AddProjectDetails() {
  const [projectDetails, setProjectDetails] = useState({
    priority: [],
    type: [],
    statue: [],
    position: [],
  });
  const { state } = useLocation();
  const { project } = state;
  console.log(project);
  return (
    <div>
      <h2>Create Project</h2>
      <div className="timeline">
        <span className="active">1</span>
        <span className="active">2</span>
      </div>
      {/* Priority Data */}
      <SelectPriority project={project} />
    </div>
  );
}
