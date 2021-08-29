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
  static async show(req, res, next) {
    try {
      // const post = await Post.findById(req.params.id);
      // if(!post){
      //   res.status(404).json({message: "Post Not Found"})
      // }
      // res.status(200).json(post)
      // return
      Post.findById(req.params.id, (err, result) => {
        if (!result) {
          res.status(404).json({ message: "Post Not Found" });
        }
        res.status(200).json(result);
        return result;
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || "Some error retrieving posts.",
        error,
      });
    }
  }
  static async update(req, res, next) {
    try {
      const payload = {
        title: req.body.title,
        body: req.body.body,
        published: req.body.published ? req.body.published : false,
      };
      const post = await Post.findOneAndUpdate(
        { id: req.params.id },
        payload,
        {
          returnOriginal: false,
          new: false,
          // handle null id
          upsert: true,
        },
        (err, result) => {
          if (!result) {
            res.status(404).json({ message: "Post Not Found" });
          }
          res.status(200).json(result);
          return result;
        }
      );
      res.status(200).json(result);
      return result;
    } catch (error) {
      res.status(500).json({
        message: error.message || "Some error retrieving posts.",
        error,
      });
    }
  }
  static async delete(req, res, next) {
    try {
      const post = await Post.findByIdAndRemove(req.params.id, (err, result) => {
        if (!result) {
          res.status(404).json({ message: "Post Not Found" });
        }
        res.status(200).json(result);
      } );
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({
        message: error.message || "Some error retrieving posts.",
        error,
      });
    }
  }
}
module.exports = PostController;
