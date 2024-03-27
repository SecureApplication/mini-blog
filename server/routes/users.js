const express = require("express");
const router = express.Router();
const { connection } = require("../config/database");

// Routes
router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const query = "SELECT * FROM users WHERE username = " + "'" + username + "'";
  // SQL Injection Vulnerability
  connection.query(query, (err, user) => {
    if (user === undefined || user.length == 0) {
      res.json({ error: "User does not exist" });
      return;
    } else if (password !== user[0].password) {
      res.json({ error: "Incorrect password" });
      return;
    } else {
      res.json({ username: username, id: user[0].id });
    }
  });
});

router.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const query = "SELECT * FROM users WHERE username = " + "'" + username + "'";
  // SQL Injection Vulnerability
  connection.query(query, (err, user) => {
    if (user.length != 0) {
      res.json({ error: "User already exists" });
      return;
    } else {
      connection.query(
        "INSERT INTO users (username, password) VALUES ('" +
          username +
          "', '" +
          password +
          "')",
        (err, result) => {
          if (err) throw err;
          res.json("User created");
        }
      );
    }
  });
});

module.exports = router;
