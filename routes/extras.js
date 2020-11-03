const express = require("express");
const routes = express.Router();

routes.get("/locals", (req, res) => {
  res.render("locals");
});

module.exports = routes;
