require("dotenv").config();

const mysql = require("mysql2");

// Secure Connection credentials
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Check database connection
connection.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Database connected!");
  }
});

// Query to create posts table
const queryPostsTable = `
CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    username TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;

// Query to create users table
const queryUsersTable = `
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username TEXT,
    password TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;

// Create Posts table
connection.query(queryPostsTable, (err, results) => {
  if (err) {
    console.error("Error creating table:", err);
  } else {
    console.log("Posts table created successfully!");
  }
});

// Create Users table
connection.query(queryUsersTable, (err, results) => {
  if (err) {
    console.error("Error creating table:", err);
  } else {
    console.log("Users table created successfully!");
  }
});

module.exports = { connection };
