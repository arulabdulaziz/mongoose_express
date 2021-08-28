const db = require("../models");
const Post = db.post;
class PostController {
  static async index(req, res, next) {
    try {
      const post = await Post.find();
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({
        message: error.message || "Some error retrieving posts.",
      });
    }
  }
  static async create(req, res, next) {
    try {
      const post = new Post({
        title: req.body.title,
        body: req.body.body,
        published: req.body.published ? req.body.published : false,
      });
      const result = await post.save(post);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({
        message: error.message || "Some error retrieving posts.",
      });
    }
  }
}
module.exports = PostController;
