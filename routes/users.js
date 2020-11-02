const express = require("express");
const router = express.Router();
const { asyncHandler, handleValidationErrors } = require("../utils");
const bcrypt = require("bcryptjs");
const { User, Tweet } = require("../db/models");
const csrf = require("csurf");
const cookieParser = require('cookie-parser');
const { check } = require('express-validator');
const { logInUser, logoutUser } = require("../auth");

// const { db } = require("../config");
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
      return User.findOne({
        where: {
          email: value
        }
      })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided email address is already in use by another account')
          }
        })
    }),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for password')
    .isLength({ max: 20, min: 8 })
    .withMessage('Password has to be between 8 and 20 characters'),
  check('confirm-password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for confirm password')
    .isLength({ max: 20, min: 8 })
    .withMessage('Confirm Password has to be between 8 and 20 characters')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Confirmed password does not match Password')
      }
      return true;
    })
]

router.get("/", csrfProtection, function (req, res, next) {
  // const user = User.build()
  // console.log
  res.render("create-user", { title: 'Create User', csrfToken: req.csrfToken() });
});

router.post(
  "/", csrfProtection, validateForm, handleValidationErrors,
  asyncHandler(async (req, res) => {
    const { name, city, email, password, bio } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({ email, city, name, hashedPassword, bio });
    logInUser(req, res, user);
    res.render('index', { title: 'Farm Feed!!!', user });
  })
);


module.exports = router;
