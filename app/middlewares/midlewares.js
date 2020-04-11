const express = require("express");
const routes = require("../routes/api");
const app = express();
const controllers = require("../controllers/index");
const helpers = require("../../helpers/index");
app.use(routes({ controllers, helpers }));
module.exports = app;
