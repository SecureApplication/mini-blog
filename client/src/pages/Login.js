import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Login() {
  const { setAuthState } = useContext(AuthContext);
  let navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = (data) => {
    fetch("http://localhost:5000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          localStorage.setItem("accessToken", data.token);
          setAuthState({
            username: data.username,
            id: data.id,
            status: true,
          });
          navigate("/");
        }
      });
  };

  return (
    <div className="App">
      <h1>Login</h1>
      <div>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form className="formContainer">
            <label>Username: </label>
            <ErrorMessage name="username" component="span" />
            <Field
              className="usernameInput"
              autoComplete="off"
              name="username"
              placeholder="Enter username"
            />
            <label>Password: </label>
            <ErrorMessage name="password" component="span" />
            <Field
              className="passwordInput"
              autoComplete="off"
              type="password"
              name="password"
              placeholder="Enter password"
            />
            <button type="submit"> Login </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Login;
