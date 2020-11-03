var express = require('express');
var router = express.Router();
const { User } = require('../db/models')
const { asyncHandler } = require('../utils')
const { restoreUser } = require("../auth")

/* GET home page. */
router.get('/', restoreUser, asyncHandler( async function(req, res, next) {
  let user;
  if (res.locals.authenticated) {
    user = await User.findByPk(req.session.auth.userId)
  }
  res.render('index', { title: 'Farm Feed!!!', user});
}));

module.exports = router;
