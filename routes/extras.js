const express = require("express");
const routes = express.Router();
const { restoreUser } = require("../auth");

routes.get("/locals", restoreUser, (req, res) => {
  const user = res.locals.user;
  res.render("locals", { user });
});

routes.get("/topics", restoreUser, (req, res) => {
  const user = res.locals.user;
  res.render("topics");
});

routes.get("/markets", restoreUser, (req, res) => {
  const user = res.locals.user;
  res.render("markets");
});

routes.get("/farmers", restoreUser, (req, res) => {
  const user = res.locals.user;
  res.render("farmers");
});
module.exports = routes;
