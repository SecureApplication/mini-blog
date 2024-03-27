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
    <div>
      <div className="registerContainer">
        <label>Username:</label>
        <input type="text" placeholder="Enter username" id="username" />
        <label>Password:</label>
        {/* Data Exposure, password exposed */}
        <input type="text" placeholder="Enter password" id="password" />
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
    </div>
  );
}

export default Register;
