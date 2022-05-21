import "./App.css";
import React, { useEffect, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login.page";
import RegisterPage from "./pages/register.page";
import HomePage from "./pages/home.page";
import { UserContext } from "./context/user.context";
import Header from "./components/header";
import Projects from "./pages/projects.page";

function App() {
  const { setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:5000/users/checkAuthentication", {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then(async (res) => {
        const response = await res.json();
        if (response.isLoggedin) {
          setCurrentUser(response.data);
        } else {
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="container">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route exact path="/projects" element={<Projects />} />
          <Route exact path="/" element={<HomePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
