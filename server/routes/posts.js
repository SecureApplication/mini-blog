const express = require("express");
const router = express.Router();
const { connection } = require("../config/database");

// Routes
router.get("/", (req, res) => {
  // Vulnerable to SQL Injection & Stored XSS
  const query = "SELECT * FROM posts";

  connection.query(query, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

router.post("/", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const username = req.body.username;

  // Vulnerable to SQL Injection & Stored XSS
  const query = `INSERT INTO posts (title, content, username) VALUES ('${title}', '${content}', '${username}')`;

  connection.query(query, (err, results) => {
    if (err) throw err;
    res.send("Post created");
  });
});

router.get("/:id", (req, res) => {
  const postId = req.params.id;

  // Vulnerable to SQL Injection & Stored XSS
  const query = `SELECT * FROM posts WHERE id = '${postId}'`;

  connection.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

module.exports = router;
