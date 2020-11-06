var express = require('express');
var router = express.Router();
const { User, Post, Comment } = require('../db/models')
const { asyncHandler } = require('../utils')
const { restoreUser } = require("../auth")

/**********Search Bar*********/
// router.get('/:search/(\\w+)', restoreUser, asyncHandler(async (req, res) => {
//   const user = res.locals.user;
//   const searchRes = req.params.searchRes
//   res.redirect('/');
// }))

module.exports = router;