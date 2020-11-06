const express = require("express");
const router = express.Router();
const { asyncHandler, handleValidationErrors } = require("../utils");
const { Comment, User, Post, Upvote } = require("../db/models");
const { restoreUser } = require("../auth");


// router.get('/:id', (req, res) => {
//   res.send('jojoj');
// })
router.delete('/:id', restoreUser, asyncHandler(async (req, res) => {
  const postId = parseInt(req.params.id, 10);
  // console.log('....................delete route hit')
  console.log(postId)
  const comment = await Comment.findByPk(postId)

  await comment.destroy();

  return res.json({})

}))




module.exports = router
