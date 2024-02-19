const express = require("express");
const mongodb = require("./db/db");
const app = express();
const dotenv = require("dotenv");
// const { requireSignIn } = require("./middlewwears/authMiddlewear");
const cors = require("cors");

// configure env
dotenv.config();

// db connecion
mongodb();

// middlewares
app.use(express.json());
app.use(cors());
// routes
app.use("/api", require("./routes/Authroute"));

// port
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App is listening port ${port}`);
});
