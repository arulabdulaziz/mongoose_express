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
require("./app/models");
app.get("/", PostController.index);
app.post("/", PostController.create);
app.get("/:id", PostController.show);
app.put("/:id", PostController.update);
app.delete("/:id", PostController.delete);

module.exports = app;
