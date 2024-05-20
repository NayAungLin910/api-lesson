const { checkValuesNotExist } = require("../helpers/FormHelpers");

let posts = [
  {
    id: 1,
    userId: 1,
    title: "Post Title 1",
    description: "The description of post title 1.",
  },
  {
    id: 2,
    userId: 1,
    title: "Post Title 2",
    description: "The description of post title 2.",
  },
  {
    id: 3,
    userId: 2,
    title: "Post Title 3",
    description: "The description of post title 3 is just as told.",
  },
  {
    id: 4,
    userId: 2,
    title: "Post Title 4",
    description: "The description of post title 4 is just as told.",
  },
  {
    id: 5,
    userId: 3,
    title: "Post Title 5",
    description: "The description of post title 5 is just as told",
  },
];

/**
 * Get all posts
 */
const getAllPosts = (req, res) => {
  res.status(200).send(posts);
};

/**
 * Get specific post
 */
const getSpecificPost = (req, res) => {
  const post = findPost(req.query.id, res);

  if (!post) return;

  res.status(200).send(post);
};

/**
 * Create a new post
 */
const createNewPost = (req, res) => {
  if (checkValuesNotExist(req.body, res)) return;

  if (checkDupliTitle(req.body.title, res)) return;

  let post = posts[posts.length - 1] || { id: 0 }; // get the lastest post added

  let newPost = {
    id: post.id + 1,
    userId: req.body.userId,
    title: req.body.title,
    description: req.body.description,
  };

  posts.push(newPost);

  let postCreated = findPost(newPost.id, res);

  if (!postCreated) return;

  res.status(200).send(newPost);
};

/**
 * Update post
 */
const updatePost = (req, res) => {
  if (checkValuesNotExist(req.body, res)) return;

  let postToBeUpdated = findPost(req.body.id, res);
  if (!postToBeUpdated) return;

  if (checkDupliTitle(req.body.title, res, req.body.id)) return;

  // update the posts array with the latest post data
  posts = posts.map((post) => {
    if (post.id == req.body.id) {
      post.userId = req.body.userId;
      post.title = req.body.title;
      post.description = req.body.description;
      return post;
    } else {
      return post;
    }
  });

  let updatedPost = findPost(req.body.id, res); // find the last updated post
  if (!updatedPost) return;

  res.status(200).send(updatedPost);
};

/**
 * Delete post
 */
const deletePost = (req, res) => {
  let post = findPost(req.body.id, res);
  if (!post) return;

  posts = posts.filter((p) => p.id !== post[0].id);

  res.status(200).send(posts);
};

/**
 * Find the post matching with the given id
 */
const findPost = (id, res) => {
  let post = posts.filter((post) => post.id == id); // find the post matching with the id from request

  if (post.length == 0) {
    // if post not found
    res.status(404).send({
      message: "Post not found!",
    });

    return null;
  }

  return post;
};

/**
 * Check if post with the same title exists
 */
const checkDupliTitle = (title, res, except) => {
  let post = posts.filter((post) => post.title == title); // find the post with the given title

  if (except) {
    // check duplicate title excpet for post with id except
    post = post.filter((p) => p.id !== except);
  }

  if (post.length > 0) {
    // if post with the same title exists
    res.status(401).send({
      message: "The post title already exists!",
    });
    return true;
  }
};

module.exports = {
  getAllPosts,
  getSpecificPost,
  createNewPost,
  updatePost,
  deletePost,
};
