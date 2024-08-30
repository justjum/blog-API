const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");
const verifyToken = require("../config/jwtauth");

router.get("/", postController.getAllPosts);

router.get("/:postId", postController.getPost);

router.post("/", verifyToken, postController.postPost);

router.put("/:postId", postController.updatePost);

router.delete("/:postId", postController.deletePost);

router.get("/:postId/comments", commentController.getAllComments);

router.get("/:postId/comments/:commentId", commentController.getComment);

router.post("/:postId/comments/", verifyToken, commentController.postComment);

router.put("/:postId/comments/:commentId", commentController.updateComment);

router.delete("/:postId/comments/:commentId", commentController.deleteComment);

module.exports = router;
