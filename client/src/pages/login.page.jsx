import React, { useState, useEffect } from "react";
import FormField from "../components/formField";
import Button from "../components/button";

function LoginPage() {
  const [loginUserData, setLoginUserData] = useState({
    email: "",
    password: "",
  });

  const [data, setData] = useState();

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginUserData({ ...loginUserData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginUserData),
    })
      .then(async (res) => {
        const response = await res.json();
        setData(response);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

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
