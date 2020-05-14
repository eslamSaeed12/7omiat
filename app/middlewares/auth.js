module.exports = ({ decode, guard, dotenv }) => {
  return async (req, res, next) => {
    try {
      //jwt token of the request
      const { token } = req.headers;

      if (!token)
        return res.status(401).json({
          message: "unAuthorized",
        }); // redirect to the unauthoriezed endpoint

      const id = decode(token, dotenv("secret")).id;

      if (!Boolean(id))
        return res.status(401).json({
          message: "unAuthorized",
        }); // redirect to the unauthoriezed endpoint
      const guardGate = await guard({
        id,
      });

      if (!guardGate)
        return res.status(403).json({
          message: "you dont have the permisions",
        }); // redirect to the unauthoriezed endpoint

      req.auth = guardGate;
      return next();
    } catch (e) {
      if (dotenv("NODE_ENV") === "development") console.log(e);
      if (e.message === "invalid signature")
        return res.status(403).json({
          message: "you dont have the permisions",
        });
      if (e.message === "jwt malformed")
        return res.status(403).json({
          message: "you dont have the permisions",
        });
      if (e.message === "secret key only string")
        return res.status(403).json({
          message: "you dont have the permisions",
        });
      if (e.message === "secret key is missing")
        return res.status(403).json({
          message: "you dont have the permisions",
        });
      if (e.message === "jwt token should only string")
        return res.status(403).json({
          message: "you dont have the permisions",
        });
      if (e.message === "jwt token should only string")
        return res.status(403).json({
          message: "you dont have the permisions",
        });
      if (e.message === "jwt token is missing !")
        return res.status(403).json({
          message: "you dont have the permisions",
        });
      if (e.message === "payload is missing")
        if (e.message === 'Expected "payload" to be a plain object.')
          return res.status(403).json({
            message: "you dont have the permisions",
          });
      if (dotenv("NODE_ENV") !== "development") return next(e);
    }
  };
};
