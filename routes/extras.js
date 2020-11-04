const express = require("express");
const routes = express.Router();

routes.get("/locals", (req, res) => {
  res.render("locals");
});

routes.get("/topics", (req, res) => {
  res.render("topics");
});

routes.get("/markets", (req, res) => {
  res.render("markets");
});

routes.get("/farmers", (req, res) => {
  res.render("farmers");
});
module.exports = routes;
