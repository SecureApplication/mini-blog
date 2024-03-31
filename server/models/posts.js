module.exports = () => {
  const queryPostsTable = `
    CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`;

  const createPostsTable = connection.query(queryPostsTable, (err, results) => {
    if (err) {
      console.error("Error creating table:", err);
    } else {
      console.log("Posts table created successfully!");
    }
  });

  return createPostsTable;
};
