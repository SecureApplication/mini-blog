const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;

app.use(express.json());
app.use(cors());

// Router
const postRouter = require("./routes/posts");
app.use("/posts", postRouter);
const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
