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

    // normall register
    async register(req, res, next) {
      try {
        const { username, email, password, remember_me, role_id } = req.body;
        const { sanitizer, restful, crypto, uuid } = helpers;
        const { $str, $int } = sanitizer;
        const { role, user } = db;
        let cover;

        const userValidator = helpers.validators.user({
          username: $str(username),
          email: $str(email),
          password: $str(password),
          role_id: $int(role_id),
        });

        // here validate the model all

        if (userValidator.error) {
          cover = restful({ type: 0, msg: 400 })(userValidator.error.details);
          return res.status(cover.code).json(cover);
        }

        // check role id , check username uniqueness , email uniquness

        const roleCheck = await role.findOne({
          where: { id: role_id || null },
        });

        if (!roleCheck) {
          cover = helpers.restful({ type: 0, msg: 404 })({
            message: "this role is not exist or maybe deleted !",
            field: "id",
          });
          return res.status(cover.code).json(cover);
        }

        // username uniqueness

        const usernameCheck = await user.findOne({
          where: { username: $str(username || "") },
        });

        if (usernameCheck) {
          cover = helpers.restful({ type: 0, msg: 400 })({
            message: "this username is exist!",
            field: "username",
          });
          return res.status(cover.code).json(cover);
        }

        // email check
        const emailCheck = await user.findOne({
          where: { email: $str(email || "") },
        });

        if (emailCheck) {
          cover = helpers.restful({ type: 0, msg: 400 })({
            message: "this email is exist!",
            field: "email",
          });
          return res.status(cover.code).json(cover);
        }

        // all had been checked now create

        const newedUser = await user.create({
          ...userValidator.value,
          password: crypto.hash(userValidator.value.password),
          id: uuid.v1(),
        });
        cover = restful({ type: 1, msg: 201 })(newedUser);
        return res.status(cover.code).json(cover);
      } catch (e) {
        return next(e);
      }
    },
    // oauth facebook login
    async facebookLogin(req, res, next) {},
    // oauth google login
    async googleLogin(req, res, next) {},

    // oauth facebook register
    async facebookRegister(req, res, next) {},

    // oauth google register
    async googleRegister(req, res, next) {},
  };
};

module.exports = ({ helpers, db }) => {
  return authController({ helpers, db });
};
