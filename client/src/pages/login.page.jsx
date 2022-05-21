import React, { useState, useEffect, useContext } from "react";
import FormField from "../components/formField";
import Button from "../components/button";
import { UserContext } from "../context/user.context";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [loginUserData, setLoginUserData] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginUserData({ ...loginUserData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/users/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginUserData),
    })
      .then(async (res) => {
        const response = await res.json();
        console.log(response);
        setCurrentUser(response);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field-block">
          <div className="form-element">
            <p>Email</p>
            <FormField
              name="email"
              type="email"
              value={loginUserData["email"]}
              onChange={handleLoginChange}
            />
          </div>
        </div>
        <div className="form-field-block">
          <div className="form-element">
            <p>Password</p>
            <FormField
              type="password"
              name="password"
              onChange={handleLoginChange}
              value={loginUserData["password"]}
            />
          </div>
        </div>

        <Button type="submit" value="Login" style="primary" />
      </form>
    </div>
  );
}

export default LoginPage;
