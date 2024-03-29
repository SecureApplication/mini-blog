const express = require("express");
const router = express.Router();
const { connection } = require("../config/database");
const sanitizeHtml = require("sanitize-html");
const bcrypt = require("bcryptjs"); //bcrypt library installed to encrypt password from user registration
const { validateToken } = require("../middlewares/AuthMiddleware");

const { sign } = require("jsonwebtoken");

// Routes
router.post("/login", (req, res) => {
  const username = sanitizeHtml(req.body.username); // Sanitizes input
  const password = sanitizeHtml(req.body.password); // Sanitizes input

  const query = "SELECT * FROM users WHERE username = ?";
  const parameters = [username];

  connection.query(query, parameters, (err, user) => {
    if (user.length === 0) {
      res.json({ error: "User does not exist" });
      return;
    } else {
      // Compare encrypted password from database and password entered by the user in the front end
      bcrypt.compare(password, user[0].password).then((match) => {
        if (!match) {
          res.json({ error: "Incorrect password" });
          return;
        }
        const accessToken = sign(
          { username: user.username, id: user.id },
          "importantsecret"
        );
        res.json({ token: accessToken, username: username, id: user[0].id });
      });
    }
  });
});

router.post("/register", (req, res) => {
  const username = sanitizeHtml(req.body.username); // Sanitizes input
  const password = sanitizeHtml(req.body.password); // Sanitizes input

  // Check for existing user
  const checkUserQuery = "SELECT * FROM users WHERE username = ?";
  const checkUserParameters = [username];

  connection.query(checkUserQuery, checkUserParameters, (err, user) => {
    if (err) throw err;

    if (user.length !== 0) {
      res.json({ error: "User already exists" });
      return;
    } else {
      // Hash new user's password
      bcrypt.hash(password, 10).then((hash) => {
        // Create new user
        const insertQuery =
          "INSERT INTO users (username, password) VALUES (?, ?)";
        const insertParameters = [username, hash];

        connection.query(insertQuery, insertParameters, (err, result) => {
          if (err) throw err;
          res.json("User created");
        });
      });
    }
  });
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;
