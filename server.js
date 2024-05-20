const express = require("express");
const cors = require("cors");
require("dotenv").config();

const userRouter = require("./routes/userRouter.js");
const postRouter = require("./routes/postRouter.js");
const commentRouter = require("./routes/commentRouter.js");

const app = express();

// Configure CORS
const corsOptions = {
  origin: "*", 
  optionsSuccessStatus: 200 
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// router
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
