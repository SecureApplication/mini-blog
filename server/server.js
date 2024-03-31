const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const port = 5000;

app.use(express.json());
app.use(cors());

// enabling the Helmet middleware
app.use(helmet());

// Router
const postRouter = require("./routes/posts");
app.use("/posts", postRouter);
const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
