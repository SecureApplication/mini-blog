const express = require("express");
const router = express.Router();
const { connection } = require("../config/database");

// Routes
router.get("/", (req, res) => {
  // SQL Injection Vulnerability
  connection.query("SELECT * FROM posts", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

router.post("/", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const username = req.body.username;

  // SQL Injection Vulnerability
  connection.query(
    "INSERT INTO posts (title, content, username) VALUES ('" +
      title +
      "', '" +
      content +
      "', '" +
      username +
      "')",
    (err, result) => {
      if (err) throw err;
      res.send("Post created");
    }
  );
});

router.get("/:id", (req, res) => {
  const postId = req.params.id;

  // SQL Injection Vulnerability
  connection.query(
    "SELECT * FROM posts WHERE id = " + postId,
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

module.exports = router;
