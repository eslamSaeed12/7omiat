const express = require("express");
const app = express();
const routes = require("../routes/api");
const controllers = require("../controllers/index");
const helpers = require("../../helpers/index");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const connectId = require("connect-rid");
const morgan = require("morgan");
const guard = require("../core/guards.index");
const db = require("../../models/index");

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
    const fs = require("fs");
    app.use(morgan("dev"));
  }
  if (dotenv("NODE_ENV") !== "development") {
    app.use(
      morgan((tokens, req, res) => {
        const httpLogger = helpers.logger("./logs/http.log");
        httpLogger.addRecord({
          url: tokens.url(req, res),
          status: tokens.status(req, res),
          content_length: tokens.res(req, res, "content-length"),
          res_time: tokens["response-time"](req, res) + "ms",
        });
      })
    );
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
    })
  );

  if (dotenv("NODE_ENV") !== "development") {
    app.use(($error, req, res, next) => {
      const errorLogger = helpers.errorLogger("./logs/error.log");
      errorLogger.addRecord({
        name: $error.name,
        message: $error.message,
        stack: $error.stack,
      });
      return res.status(500).json("something went wrong , we will fix it soon");
    });
  }
  app.use(($err, req, res, next) => {
    console.log($err);
    res.end();
  });
})().catch((e) => console.log(e));

module.exports = app;
