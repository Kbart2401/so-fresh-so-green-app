const express = require("express");
const routes = express.Router();
const { restoreUser } = require("../auth");

routes.get("/events", restoreUser, (req, res) => {
  const user = res.locals.user;
  res.render("events", { user });
});

routes.get("/faq", restoreUser, (req, res) => {
  const user = res.locals.user;
  res.render("faq", { user });
});

routes.get("/contact", restoreUser, (req, res) => {
  const user = res.locals.user;
  res.render("contact", { user });
});

module.exports = routes;
