import React from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  let navigate = useNavigate();

  const registerUser = (username, password) => {
    fetch("http://localhost:5000/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
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
          type="text"
          placeholder="Enter Password"
          name="psw"
          id="password"
          required
        />
        <button
          onClick={() =>
            registerUser(
              document.getElementById("username").value,
              document.getElementById("password").value
            )
          }
        >
          Register
        </button>
      </div>
      <br />
      <div>
        <h3>Sensitive Data Exposure here!</h3>
        <p>
          Password field does not hide characters enetered by the user :{"("}
        </p>
      </div>
    </div>
  );
}

export default Register;
