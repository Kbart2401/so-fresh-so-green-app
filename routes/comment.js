const express = require("express");
const router = express.Router();
const { asyncHandler, handleValidationErrors } = require("../utils");
const { Comment, User, Post, Upvote } = require("../db/models");
const { restoreUser } = require("../auth");


// router.get('/:id', (req, res) => {
//   res.send('jojoj');
// })
router.delete('/:id', restoreUser, asyncHandler(async (req, res) => {
  const commentId = parseInt(req.params.id, 10);
  const comment = await Comment.findByPk(commentId)

  const postId = comment.postId
  await comment.destroy();

  return res.json({ postId })

}))




module.exports = router
