import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import faker from "@faker-js/faker";

const Register = ({ LoggedIn, setLoggedIn }) => {
  let navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState({
    id: Math.random() * 1000,
    image : faker.image.avatar(),
    name: "",
    email: "",
    password: "",
  });

  const setValue = (e) => {
    //   localStorage.clear();
    setErrors([]);
    const name = e.target.name;
    setUser({
      ...user,
      [name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    
    e.preventDefault();
    let isValid = true;
    let errors = {};
    let emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    //User Name Validation
    if (user.name === "") {
      isValid = false;
      errors["name"] = "This field is required!";
    }

    //Email Validation
    if (user.email === "") {
      errors["email"] = "This field is required!";
      isValid = false;
    } else if (!emailRegex.test(user.email)) {
      errors["email"] = "It is not valid email";
      isValid = false;
    }

    if (JSON.parse(localStorage.getItem("users")) !== null) {
      var users = JSON.parse(localStorage.getItem("users"));
      let u = users.filter((u) => {
        if (u.email === user.email) return true;
      });
      if (u.length === 1) {
        errors["email"] = "This email is already token!";
        isValid = false;
      }
    }

    //password Validation
    if (user.password === "") {
      errors["password"] = "This field is required!";
      isValid = false;
    } else if (!passRegex.test(user.password)) {
      errors["password"] = "It should be more than 8 character";
      isValid = false;
    }
    setErrors(errors);

    if (isValid) {
      if (JSON.parse(localStorage.getItem("users")) === null) {
        localStorage.setItem("users", JSON.stringify([user]));
      } else {
        let users = JSON.parse(localStorage.getItem("users"));
        let newUsers = [...users, user];
        localStorage.setItem("users", JSON.stringify(newUsers));
      }
      sessionStorage.setItem("currentUser", JSON.stringify([user]));
    
      setUser({
        name: "",
        email: "",
        password: "",
        image: "",
        id: "",
      });
      setLoggedIn(true);
      navigate("/home");
    }
  };

  return (
    <div className="content">
      <form className="ui form" onSubmit={submitHandler}>
        <div className="field">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={setValue}
          />
          <div className={errors.name === undefined ? "" : "ui red message"}>
            {errors.name}
          </div>
        </div>
        <div className="field">
          <label>E-mail</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={setValue}
          />
          <div className={errors.email === undefined ? "" : "ui red message"}>
            {errors.email}
          </div>
        </div>
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={setValue}
            autoComplete="on"
          />
          <div
            className={errors.password === undefined ? "" : "ui red message"}
          >
            {errors.password}
          </div>
        </div>
        {/* <div className="field">
        <label>Confirm Password</label>
        <input type="password" name="confirm_password" onChange={setValue} />
      </div> */}
        <button className="ui violet button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};
export default Register;
