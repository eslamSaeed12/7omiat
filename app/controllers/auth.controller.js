const authController = ({
  helpers,
  db,
}) => {
  return {
    async login(req, res, next) {
      try {
        const {
          email,
          password
        } = req.body;
        const {
          jwt,
          dotenv,
          crypto,
          sanitizer
        } = helpers;
        const {
          $str
        } = sanitizer;
        const {
          user
        } = db;
        let cover;

        const loginedUser = await user.findOne({
          where: {
            email: email ? $str(email) : "",
            password: password ? crypto.hash(password) : "",
          },
        });

        if (!loginedUser) {
          cover = helpers.restful({
            type: 0,
            msg: 404,
          })();
          return res.status(cover.code).json(cover);
        }
        const encodedUser = jwt.encode({
            id: loginedUser.id,
            username: loginedUser.username,
          },
          dotenv("secret")
        );
        cover = helpers.restful({
          type: 1,
          msg: 200,
        })({
          token: encodedUser,
        });

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
        const {
          jwt,
          dotenv
        } = helpers;
        const payload = {
          id: req.user.id,
          username: req.user.username,
        };
        const encoded = jwt.encode(payload, dotenv("secret"));
        res.cookie("META-AUTH-TOKEN", encoded, {
          httpOnly: true
        });
        return res.redirect("http://localhost:3000/panel/home");
      } catch (e) {
        return next(e);
      }
    },
    // oauth google login
    async googleLogin(req, res, next) {
      try {
        const {
          jwt,
          dotenv
        } = helpers;
        const payload = {
          id: req.user.id,
          username: req.user.username,
        };
        const encoded = jwt.encode(payload, dotenv("secret"));
        res.cookie("META-AUTH-TOKEN", encoded, {
          httpOnly: true
        });
        return res.redirect("http://localhost:3000/panel/home");
      } catch (e) {
        return next(e);
      }
    },
  };
};

module.exports = ({
  helpers,
  db,
}) => {
  return authController({
    helpers,
    db,
  });
};