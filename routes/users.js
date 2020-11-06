const express = require("express");
const router = express.Router();
const { asyncHandler, handleValidationErrors, handleUserValidationErrors } = require("../utils");
const bcrypt = require("bcryptjs");
const { User, Post, Upvote, Sequelize } = require("../db/models");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");
const { check, validationResult } = require("express-validator");
const { logInUser, logoutUser } = require("../auth");
const Op = Sequelize.Op;

// const { db } = require("../config");
/* GET users listing. */
router.use(cookieParser());
const csrfProtection = csrf({ cookie: true });

/***********Validate User Registration*********/
const validateForm = [
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for name")
    .isLength({ max: 100 })
    .withMessage("Name must not be over 100 characters"),
  check("city")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for city")
    .isLength({ max: 25 })
    .withMessage("City must not be over 25 characters"),
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for email")
    .isLength({ max: 50 })
    .withMessage("Email must not be over 50 characters")
    .isEmail()
    .withMessage("Input is not a valid email")
    .custom((value) => {
      return User.findOne({
        where: {
          email: value,
        },
      }).then((user) => {
        if (user) {
          return Promise.reject(
            "The provided email address is already in use by another account"
          );
        }
      });
    }),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for password")
    .isLength({ max: 20, min: 8 })
    .withMessage("Password has to be between 8 and 20 characters"),
  check("confirm-password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for confirm password")
    .isLength({ max: 20, min: 8 })
    .withMessage("Confirm Password has to be between 8 and 20 characters")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Confirmed password does not match Password");
      }
      return true;
    }),
];

/**********Validate Update Settings*********/
const validateUpdate = [
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for name")
    .isLength({ max: 100 })
    .withMessage("Name must not be over 100 characters"),
  check("city")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for city")
    .isLength({ max: 25 })
    .withMessage("City must not be over 25 characters"),
  check("email")
    .isLength({ max: 50 })
    .withMessage("Email must not be over 50 characters")
    .isEmail()
    .withMessage("Input is not a valid email"),
  check("password")
    .if(check('password').notEmpty())
    .isLength({ max: 20, min: 8 })
    .withMessage("Password has to be between 8 and 20 characters"),
  check("confirm-password")
    .if(check('confirm-password').notEmpty())
    .isLength({ max: 20, min: 8 })
    .withMessage("Confirm Password has to be between 8 and 20 characters")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Confirmed password does not match Password");
      }
      return true;
    }),
];


/**********Validate User Login*********/
const loginValidators = [
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for email address"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for password"),
];

/***********Render Create User**********/
router.get(
  "/",
  csrfProtection,
  asyncHandler(async function (req, res, next) {
    let user;
    if (!req.session.auth) {
      return res.render("create-user", {
        title: "Create User",
        csrfToken: req.csrfToken(),
      });
    }
    user = await User.findByPk(req.session.auth.userId);
    res.redirect("/");
  })
);

/**********Create User Submission*********/
router.post(
  "/",
  csrfProtection,
  validateForm,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const { name, city, email, password, bio, imageUrl } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({ email, city, name, hashedPassword, bio, imageUrl });
    await logInUser(req, res, user);
    req.session.save(() => res.redirect("/"));
    // res.redirect('/');
  })
);

/***********Render User Login***********/
router.get(
  "/login",
  csrfProtection,
  asyncHandler(async (req, res) => {
    let user;
    if (!req.session.auth) {
      return res.render("login-user", {
        title: "Login",
        csrfToken: req.csrfToken(),
      });
    }
    user = await User.findByPk(req.session.auth.userId);
    res.redirect("/");
  })
);

/***********User Login Submission*********/
router.post(
  "/login",
  csrfProtection,
  loginValidators,
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    let errors = [];

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      const user = await User.findOne({ where: { email } });

      if (user) {
        const isPassword = await bcrypt.compare(
          password,
          user.hashedPassword.toString()
        );
        if (isPassword) {
          await logInUser(req, res, user);
          return req.session.save(() => res.redirect("/"));
        }
      }
      errors.push("Login failed for the provided email and password");
    } else {
      errors = validatorErrors.array().map((error) => error.msg);
    }

    res.render("login-user", {
      title: "Login",
      email,
      errors,
      csrfToken: req.csrfToken(),
    });
  })
);

/***********User Logout Submission********/
router.get(
  "/logout",
  asyncHandler(async (req, res) => {
    let user;
    if (req.session.auth) {
      user = await User.findByPk(req.session.auth.userId);
      await logoutUser(req, res, user);
    }
    req.session.save(() => res.redirect("/"));
  })
);

/**********Render User Settings Page********/
router.get('/:id(\\d+)/settings',
  csrfProtection,
  asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.params.id);
    res.render('user-settings', {
      title: "Edit User",
      csrfToken: req.csrfToken(),
      user,
      id: user.id,
      name: user.name,
      city: user.city,
      email: user.email,
      bio: user.bio
    })
  }))

/*********Submit User Updates*********/
router.post('/:id(\\d+)', csrfProtection, validateUpdate,
  handleUserValidationErrors, asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.params.id);
    const { name, city, email, password, bio } = req.body;
    if (!password) {
      await user.update({ name, city, email, bio })
    } else {
      const hashedPassword = await bcrypt.hash(password, 12)
      await user.update({
        name,
        city,
        email,
        bio,
        hashedPassword,
      })
    }
    await user.save();
    res.redirect('/');
  }))

/*********Render Profile Page**********/
router.get('/:id(\\d+)/profile', asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id);
  const posts = await Post.findAll({
    where: {
      userId: user.id
    },
    include: [User, "Users"], limit: 10, order: [["userId", 'ASC']]
  })
  posts.map(post => {
    let announcements = post.announcements.split("\n")
    post.announcements = announcements
    post.upVoteCount = post.Users.length;
    return post
  })
  posts.sort((a, b) => b.upVoteCount - a.upVoteCount);
  
  const othersPosts = await Post.findAll({
    where: {
      userId: {
        [Op.ne]: user.id}
    },
    include: [User, "Users"], limit: 10, order: [["userId", 'ASC']]
  })
  othersPosts.map(othersPost => {
    let announcements = othersPost.announcements.split("\n")
    othersPost.announcements = announcements
    othersPosts.upVoteCount = othersPost.Users.length
    return othersPost
  });
  othersPosts.sort((a,b) => b.upVoteCount - a.upVoteCount);
  
  res.render('profile', { user, posts, othersPosts });
}))

module.exports = router;
