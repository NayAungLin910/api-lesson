const commentRouter = require("express").Router();

const commentController = require("../controllers/commentController.js");

commentRouter.post(
  "/get-comments-of-post",
  commentController.getCommentsOfPost
);
commentRouter.post(
  "/get-subcomments-of-parentcomment",
  commentController.getSubCommentsOfComment
);
commentRouter.post("/create-new-comment", commentController.postComment);
commentRouter.delete("/delete-comment", commentController.deleteComment);

module.exports = commentRouter;
