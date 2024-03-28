import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();

  const login = (username, password) => {
    fetch("http://localhost:5000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          console.log(data);
        }
      });
  };

  return (
    <div className="App">
      <div className="registerLoginContainer">
        <label for="uname">Username</label>
        <input
          className="usernameInput"
          type="text"
          placeholder="Enter Username"
          name="uname"
          id="username"
          required
        />
        <label for="psw">Password</label>
        <input
          className="passwordInput"
          type="password"
          placeholder="Enter Password"
          name="psw"
          id="password"
          required
        />
        <button
          className="loginBtn"
          onClick={() =>
            login(
              document.getElementById("username").value,
              document.getElementById("password").value
            )
          }
        >
          Login
        </button>
      </div>
      <br />
      <div>
        <h3>SQL Injection here!</h3>
        <p>Insert into username and password the following text: " OR ""="</p>
        <p>
          Now, check your console log through: Right-click {">"} Inspect
          {">"} Console
        </p>
        <p>
          You will be able to find all the users details added into the database
        </p>
        <h4>Note: Do no forget to register a user first!</h4>
      </div>
    </div>
  );
}

export default Login;
