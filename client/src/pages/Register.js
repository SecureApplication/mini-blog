import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

function Register() {
  let navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required("required field"),
    password: Yup.string().min(4).max(20).required("required field"),
  });

  const onSubmit = (data) => {
    fetch("http://localhost:5000/users/register", {
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
          navigate("/login");
        }
      });
  };

  return (
    <div className="App">
      <h1>Register</h1>
      <div>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
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
            <button type="submit"> Register </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Register;
