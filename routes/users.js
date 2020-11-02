const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../utils");
const bcrypt = require("bcryptjs");
const { User, Tweet } = require("../db/models");
const csrf = require("csurf");
/* GET users listing. */

router.get("/", function (req, res, next) {
  res.render("create-user", { title });
});

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, city, email, password, bio } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({ email, city, name, hashedPassword, bio });
  })
);

module.exports = router;
