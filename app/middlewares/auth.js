module.exports = ({ decode, guard, dotenv }) => {
  return async (req, res, next) => {
    try {
      //jwt token of the request
      const { token } = req.headers;

      if (!token) return res.redirect("/"); // redirect to the unauthoriezed endpoint

      const id = decode(token, dotenv("secret")).id;

      if (!id) return res.redirect("/"); // redirect to the unauthoriezed endpoint

      const guardGate = await guard({ id });

      console.log(guardGate);
      if (!guardGate) return res.redirect("/"); // redirect to the unauthoriezed endpoint

      req.auth = guardGate;
      return next();
    } catch (e) {
      console.log(e);
    }
  };
};
