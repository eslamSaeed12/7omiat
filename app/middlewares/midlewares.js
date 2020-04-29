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
const guard = require("../core/guards.index");
const db = require("../../models/index");
const redis = require("redis");
const client = redis.createClient();

client.on("error", (e) => {
  console.error(e);
});

const { dotenv, jwt } = helpers;
const cookieParser = require("cookie-parser");
const cors = require("cors");

(async () => {
  const passport = await require("../../configs/passport")({
    user: db.user,
  });

  const authMD = (r) => {
    return require("./auth")({
      decode: jwt.decode,
      guard: guard(r),
      dotenv,
    });
  };
  
  app.use(helmet());
  app.use(
    cookieParser({
      secret: dotenv("secret"),
    })
  );
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  if (dotenv("NODE_ENV") === "development") {
    app.use(morgan("dev"));
  } else {
    app.use(expressWinston.logger(winstonConfig.http));
  }
  app.use(connectId());
  app.use(
    passport.initialize({
      userProperty: false,
    })
  );
  app.use(
    routes({
      controllers,
      helpers,
      db,
      authMD,
      passport,
      client,
    })
  );

  if (dotenv("NODE_ENV") !== "development") {
    app.use(expressWinston.errorLogger(winstonConfig.error));
  }
})().catch((e) => console.log(e));

module.exports = app;
