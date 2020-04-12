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
  };
};

module.exports = ({ helpers, db }) => {
  return authController({ helpers, db });
};
