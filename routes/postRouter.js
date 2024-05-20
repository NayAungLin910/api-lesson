const postRouter = require("express").Router();

const postController = require("../controllers/postController.js");

postRouter.get("/", postController.getAllPosts);
postRouter.get("/get-specific-post", postController.getSpecificPost);
postRouter.post("/create-new-post", postController.createNewPost);
postRouter.put("/update-specific-post", postController.updatePost);
postRouter.delete("/delete-post", postController.deletePost);

module.exports = postRouter;
