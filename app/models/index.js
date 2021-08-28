const dbConfig = require("../../config/db.config");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
const db = {
  mongoose,
  url: dbConfig.url,
  post: require("./post.model")(mongoose)
};
module.exports = db;
