import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserState from "./context/user/user-state";
import ProjectsState from "./context/projects/projects-state";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <UserState>
      <ProjectsState>
        <App />
      </ProjectsState>
    </UserState>
  </BrowserRouter>
);
