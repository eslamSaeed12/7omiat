const express = require("express");
const routes = require("../routes/api");
const app = express();
const controllers = require("../controllers/index");
const helpers = require("../../helpers/index");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const connectId = require("connect-rid");
const morgan = require("morgan");
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(morgan("dev"));
app.use(connectId());
app.use(routes({ controllers, helpers }));
module.exports = app;
