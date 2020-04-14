const authController = ({ helpers, db }) => {
  return {
    async login(req, res, next) {
      try {
        const { email, password } = req.body;
        const { jwt, dotenv, crypto, sanitizer } = helpers;
        const { $str } = sanitizer;
        const { user } = db;
        let cover;
        const loginedUser = await user.findOne({
          where: { email: $str(email), password: crypto.hash($str(password)) },
        });

        if (!loginedUser) {
          cover = helpers.restful({ type: 0, msg: 404 });
          return res.status(cover.code).json(cover);
        }
        const encodedUser = jwt.encode(
          { id: loginedUser.id },
          dotenv("secret")
        );
        cover = helpers.restful({ type: 1, msg: 302 })({ token: encodedUser });
        return res.status(cover.code).json(cover);
      } catch (e) {
        return next(e);
      }
    },
    // oauth facebook login
    async facebookLogin(req, res, next) {
      try {
        // here we generate jwt token and send it to the
        // we should generate jwt for this user and send with cookies
        const { jwt, dotenv } = helpers;
        const payload = { id: req.user.id };
        const encoded = jwt.encode(payload, dotenv("secret"));
        res.cookie("auth_token_jwt", encoded);
        return res.redirect("/spa");
      } catch (e) {
        return next(e);
      }
    },
    // oauth google login
    async googleLogin(req, res, next) {
      try {
        const { jwt, dotenv } = helpers;
        const payload = { id: req.user.id };
        const encoded = jwt.encode(payload, dotenv("secret"));
        res.cookie("auth_token_jwt", encoded);
        return res.redirect("/spa");
      } catch (e) {
        return next(e);
      }
    },
  };
};

module.exports = ({ helpers, db }) => {
  return authController({ helpers, db });
};
