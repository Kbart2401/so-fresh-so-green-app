const express = require("express");
const router = express.Router();
const { asyncHandler, handleValidationErrors } = require("../utils");
const bcrypt = require("bcryptjs");
const { User, Tweet } = require("../db/models");
const csrf = require("csurf");
const cookieParser = require('cookie-parser');
const { check } = require('express-validator');
const { db } = require("../config");
/* GET users listing. */
router.use(cookieParser());
const csrfProtection = csrf({ cookie: true });

const validateForm = [
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for name')
    .isLength({ max: 100 })
    .withMessage("Name must not be over 100 characters"),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for city')
    .isLength({ max: 25 })
    .withMessage("City must not be over 25 characters"),
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for email')
    .isLength({ max: 50 })
    .withMessage("Email must not be over 50 characters")
    .isEmail()
    .withMessage('Input is not a valid email')
    .custom((value) => {
      return db.User.findOne({
        where: {
          email: value
        }
      }).then((user) => {
        if (user) {
          return Promise.reject('The provided email address is already in use by another account')
        }
      })
    })


]

router.get("/", csrfProtection, function (req, res, next) {
  res.render("create-user", { title: 'Create User', csrfToken: req.csrfToken() });
});

router.post(
  "/", csrfProtection, handleValidationErrors,
  asyncHandler(async (req, res) => {
    const { name, city, email, password, bio } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({ email, city, name, hashedPassword, bio });
  })
);

module.exports = router;
