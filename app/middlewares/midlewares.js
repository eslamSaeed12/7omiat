const express = require("express");
const app = express();
const routes = require("../routes/api");
const controllers = require("../controllers/index");
const helpers = require("../../helpers/index");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const connectId = require("connect-rid");
const morgan = require("morgan");
const expressWinston = require("express-winston");
const winston = require("winston");
const winstonConfig = require("../../configs/logger")(winston);
const { dotenv } = helpers;

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

if (dotenv("NODE_ENV") === "development") {
  app.use(morgan("dev"));
} else {
  app.use(expressWinston.logger(winstonConfig.http));
}

app.use(connectId());
app.use(routes({ controllers, helpers }));

if (dotenv("NODE_ENV") !== "development") {
  app.use(expressWinston.errorLogger(winstonConfig.error));
}

module.exports = app;
