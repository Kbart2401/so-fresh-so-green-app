const express = require("express");
const router = express.Router();
const { asyncHandler, handleValidationErrors } = require("../utils");
const { Comment, User, Post, Upvote } = require("../db/models");
const { restoreUser } = require("../auth");



router.delete('/:id', restoreUser, asyncHandler(async (req, res) => {
  const postId = parseInt(req.params.id, 10);

  const comment = await Comment.findByPk(id)

  await comment.destroy();

  return res.json({key: "deleted"})

}))




module.exports = router