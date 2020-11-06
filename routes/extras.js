const express = require("express");
const routes = express.Router();
const { restoreUser } = require("../auth");

routes.get("/locals", restoreUser, (req, res) => {
  const user = res.locals.user;
  res.render("locals", { user });
});

routes.get("/topics", restoreUser, (req, res) => {
  const user = res.locals.user;
  res.render("topics", { user });
});

routes.get("/markets", restoreUser, (req, res) => {
  const user = res.locals.user;
  res.render("markets", { user });
});

routes.get("/farmers", restoreUser, (req, res) => {
  const user = res.locals.user;
  res.render("farmers", { user });
});

routes.get("/faq", restoreUser, (req, res) => {
  const user = res.locals.user;
  res.render("faq", { user });
});

routes.get("/about", restoreUser, (req, res) => {
  const user = res.locals.user;
  res.render("about", { user });
});

routes.get("/contact", restoreUser, (req, res) => {
  const user = res.locals.user;
  res.render("contact", { user });
});
module.exports = routes;
