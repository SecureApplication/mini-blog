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
          navigate("/");
        }
      });
  };

  return (
    <div>
      <div className="loginContainer">
        <label>Username:</label>
        <input type="text" placeholder="Enter username" id="username" />
        <label>Password:</label>
        <input type="text" placeholder="Enter password" id="password" />
        <button
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
    </div>
  );
}

export default Login;
