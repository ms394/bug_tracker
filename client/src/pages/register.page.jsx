import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormField from "../components/formField";
import Dropdown from "../components/dropdown";
import Button from "../components/button";
import { registerUser } from "../util";

function RegisterPage() {
  const [registerUserData, setRegisterUserData] = useState({
    email: "",
    user_name: "",
    first_name: "",
    last_name: "",
    password: "",
    position: "",
    confirmPassword: "",
  });

  let navigate = useNavigate();

  const [data, setData] = useState();
  const [positions, setPositions] = useState([]);

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterUserData({ ...registerUserData, [name]: value });
  };

  const handleDropdown = (e) => {
    console.log(e.target.value);

    setRegisterUserData({ ...registerUserData, position: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (registerUserData["password"] !== registerUserData["confirmPassword"]) {
      alert("The Passwords do not match");
      return;
    } else if (
      registerUserData["email"] == "" ||
      registerUserData["position"] == "" ||
      registerUserData["username"] == ""
    ) {
      alert("Please fill the email, position and username fields");
      return;
    } else {
      fetch("http://localhost:5000/users/register", {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerUserData),
      })
        .then(async (res) => {
          const response = await res.json();
          console.log(response);
          setData({ ...data, response });
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/position/getPositions", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setPositions(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="register tile registerTile">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field-block">
          <FormField
            name="first_name"
            type="text"
            label="First Name"
            value={registerUserData["first_name"]}
            onChange={handleRegisterChange}
          />
          <FormField
            name="last_name"
            label="Last Name"
            type="text"
            value={registerUserData["last_name"]}
            onChange={handleRegisterChange}
          />
        </div>
        <div className="form-field-block">
          <FormField
            name="user_name"
            label="Username"
            type="text"
            value={registerUserData["user_name"]}
            onChange={handleRegisterChange}
          />

          <FormField
            name="email"
            type="email"
            label="Email"
            value={registerUserData["email"]}
            onChange={handleRegisterChange}
          />
        </div>
        <div className="form-field-block">
          <Dropdown
            name="position"
            id="position"
            values={positions}
            label="Position"
            dropdown_id="position_id"
            dropdown_value="position_value"
            handleChange={handleDropdown}
            selectedValue={registerUserData["position"]}
          />
        </div>
        <div className="form-field-block">
          <FormField
            type="password"
            name="password"
            label="Password"
            onChange={handleRegisterChange}
            value={registerUserData["password"]}
          />

          <FormField
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            onChange={handleRegisterChange}
            value={registerUserData["confirmPassword"]}
          />
        </div>

        <Button type="submit" value="Register" style="primary" />
        <br />
        <span className="lightGray">
          Already an account ? <a href="/login">Login</a>
        </span>
      </form>
    </div>
  );
}

export default RegisterPage;
