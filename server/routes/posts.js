const express = require("express");
const router = express.Router();
const { connection } = require("../config/database");
const sanitizeHtml = require("sanitize-html");

const { validateToken } = require("../middlewares/AuthMiddleware");

// Routes
router.get("/", validateToken, (req, res) => {
  const query = "SELECT * FROM posts";

  connection.query(query, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

router.post("/", validateToken, (req, res) => {
  const title = sanitizeHtml(req.body.title); // Sanitizes input
  const content = sanitizeHtml(req.body.content); // Sanitizes input
  const username = sanitizeHtml(req.body.username); // Sanitizes input

  const query = "INSERT INTO posts (title, content, username) VALUES (?, ?, ?)";
  const parameters = [title, content, username]; // Data passed safely

  connection.query(query, parameters, (err, results) => {
    if (err) throw err;
    res.send("Post created");
  });
});

module.exports = router;
