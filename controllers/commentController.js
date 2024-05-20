const { checkValuesNotExist } = require("../helpers/FormHelpers");

let comments = [
  {
    id: 1,
    userId: 1,
    postId: 1,
    parentComment: 0,
    description: "It is a cool post!",
  },
  {
    id: 2,
    userId: 2,
    postId: 1,
    parentComment: 1,
    description: "I disagree!",
  },
  {
    id: 3,
    userId: 3,
    postId: 1,
    parentComment: 2,
    description: "I disagree your disagreement!",
  },
  {
    id: 4,
    userId: 1,
    postId: 1,
    parentComment: 2,
    description: "It is actually a cool post",
  },
  {
    id: 5,
    userId: 1,
    postId: 2,
    parentComment: 0,
    description: "I like this post!",
  },
  {
    id: 6,
    userId: 2,
    postId: 2,
    parentComment: 0,
    description: "I hate this post!",
  },
];

/**
 * Get all comments of a post
 */
const getCommentsOfPost = (req, res) => {
  if (checkValuesNotExist(req.body, res, [])) return;

  let comments = findAllCommentsOfPost(req.body.postId, res);

  res.status(200).send(comments);
};

/**
 * Get sub comments of a parent comment
 */
const getSubCommentsOfComment = (req, res) => {
  if (checkValuesNotExist(req.body, res, [])) return;

  let subComments = findSubCommentsOfParentComment(req.body.parentComment, res);
  if (!subComments) return;

  res.status(200).send(subComments);
};

/**
 * Post a comment
 */
const postComment = (req, res) => {
  if (checkValuesNotExist(req.body, res, [0])) return;

  let lastestComment = comments[comments.length - 1] || { id: 0 };

  let comment = {
    id: lastestComment.id + 1,
    userId: req.body.userId,
    postId: req.body.postId,
    parentComment: req.body.parentComment,
    description: req.body.description,
  };

  comments.push(comment);

  let newComment = findCommentWithId(comment.id, res);
  if (!newComment) return;

  res.status(200).send({
    message: "Comment created successfully!",
  });
};

/**
 * Find all the comments of a post with given postId
 */
const findAllCommentsOfPost = (postId, res) => {
  const commentsFound = comments.filter((comment) => comment.postId == postId);

  if (commentsFound.length == 0) {
    res.status(404).send({
      message: "No comments found for post with postId: " + postId,
    });
    return null;
  }

  return commentsFound;
};

/**
 * Find sub comment of a parent comment
 */
const findSubCommentsOfParentComment = (
  parentComment,
  res,
  sendErrorMessage = true
) => {
  const subComments = comments.filter(
    (comment) => comment.parentComment == parentComment
  );

  if (subComments.length == 0) {
    if (sendErrorMessage) {
      res.status(404).send({
        message:
          "No sub comments found for parent comment with id: " + parentComment,
      });
    }

    return null;
  }

  return subComments;
};

/**
 * Find a comment with given id
 */
const findCommentWithId = (commentId, res, errorResponse = true) => {
  const comment = comments.filter((c) => c.id == commentId);

  if (comment.length == 0) {
    if (errorResponse) {
      res.status(404).send({
        message: "No comment found with id: " + commentId,
      });
    }
    return null;
  }

  return comment;
};

/**
 * Delete parent comment and its related child comments
 */
const deleteComment = (req, res) => {
  let commentToBeDeleted = findCommentWithId(req.body.id, res);
  if (!commentToBeDeleted) return;

  deleteCommentsAndSubComments(commentToBeDeleted[0].id, res); // recursively delete the sub comments

  res.status(200).send({
    message: "Comments and Subcomments deleted successfully!",
  });
};

/**
 * Delete the child comments recursively
 */
const deleteCommentsAndSubComments = (commentId, res) => {
  let commentToBeDeleted = findCommentWithId(commentId, res, false); // find comment to be deleted
  if (!commentToBeDeleted) return;

  comments = comments.filter((c) => c.id !== commentToBeDeleted[0].id); // delte the comment

  let subComments = findSubCommentsOfParentComment(
    commentToBeDeleted[0].id,
    res,
    false
  ); // find the sub comments of the comment
  if (!subComments) {
    return;
  }

  for (i = 0; i < subComments.length; i++) {
    // delete the sub comments by calling the function
    deleteCommentsAndSubComments(subComments[i].id, res);
  }
};

module.exports = {
  getCommentsOfPost,
  getSubCommentsOfComment,
  postComment,
  deleteComment,
};
