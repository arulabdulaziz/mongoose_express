if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const PostController = require("./app/controllers/PostController")
const db = require("./app/models");
db.mongoose
  .connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Success connect");
  })
  .catch((err) => {
    console.log("Error to connect", err);
    process.exit();
  });

app.get("/", PostController.index);
app.post("/", PostController.create);

module.exports = app;
