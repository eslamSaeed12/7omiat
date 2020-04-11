module.exports = ({ controllers, helpers, db }) => {
  const route = require("express").Router();

  const { hospitals } = controllers({ helpers, db });

  route.get("/", hospitals.index);

  return route;
};
