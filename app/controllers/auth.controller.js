const authController = ({ helpers, db }) => {
  return {
    async login(req, res, next) {
      try {
        const { email, password } = req.body;
        const { jwt, dotenv, crypto } = helpers;
        const { user } = db;

        const loginedUser = await user.findOne({
          where: { email, password: crypto.hash(password) },
        });

        if (!loginedUser) return res.json("not found user");

        return res.json(jwt.encode({ id: loginedUser.id }, dotenv("secret")));
      } catch (e) {
        return next(e);
      }
    },
  };
};

module.exports = ({ helpers, db }) => {
  return authController({ helpers, db });
};
