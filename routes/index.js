var express = require('express');
var router = express.Router();
const { User } = require('../db/models')
const { asyncHandler } = require('../utils')

/* GET home page. */
router.get('/', asyncHandler( async function(req, res, next) {
  let user;
  if (req.session.auth) {
    user = await User.findByPk(req.session.auth.userId)
  }
  res.render('index', { title: 'Farm Feed!!!', user });
}));

module.exports = router;
