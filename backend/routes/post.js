const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");
const verifyToken = require("../config/jwtauth");

router.get("/", postController.getAllPosts);

router.get("/:postId", postController.getPost);

router.post("/", verifyToken, postController.postPost);

router.put("/:postId", verifyToken, postController.updatePost);

router.put("/:postId/isPublished", verifyToken, postController.isPublished);

router.delete("/:postId", verifyToken, postController.deletePost);

router.get("/:postId/comment", commentController.getAllComments);

router.get("/:postId/comment/:commentId", commentController.getComment);

router.post("/:postId/comment/", verifyToken, commentController.postComment);

router.put(
  "/:postId/comment/:commentId",
  verifyToken,
  commentController.updateComment
);

router.delete(
  "/:postId/comment/:commentId",
  verifyToken,
  commentController.deleteComment
);

module.exports = router;
