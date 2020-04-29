const { Op } = require("sequelize");
const usersController = ({ helpers, db }) => {
  return {
    async index(req, res, next) {
      try {
        const { user } = db;
        let cover;
        const users = await user.findAll({ include: "role" });
        cover = helpers.restful({ type: 1, msg: 302 })(users || []);
        return res.status(cover.code).json(cover);
      } catch (e) {
        return next(e);
      }
    },
    async find(req, res, next) {
      try {
        const { user } = db;
        const { id } = req.params;
        let cover;
        const $user = await user.findOne({
          where: { id: helpers.sanitizer.$str(id) },
          include: "role",
        });
        if (!$user) {
          cover = helpers.restful({ type: 0, msg: 404 })(
            "maybe this user deleted or not exist"
          );
          return res.status(cover.code).json(cover);
        }
        cover = helpers.restful({ type: 1, msg: 302 })($user);
        return res.status(cover.code).json(cover);
      } catch (e) {
        return next(e);
      }
    },
    async create(req, res, next) {
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

    async update(req, res, next) {
      try {
        const {
          id,
          username,
          email,
          password,
          newPassword,
          remember_me,
          role_id,
        } = req.body;
        const { sanitizer, restful, crypto, uuid } = helpers;
        const { $str, $int } = sanitizer;
        const { role, user } = db;
        let cover;

        // check for the user exsit or not
        if (!id) {
          cover = restful({ type: 0, msg: 400 })({
            message: "user id is required",
            field: "id",
          });
          return res.status(cover.code).json(cover);
        }

        const awaitedUser = await user.findOne({
          where: { id: $str(id) },
        });

        if (!awaitedUser) {
          cover = helpers.restful({ type: 0, msg: 404 })({
            message: "this user is not exist",
          });

          return res.status(cover.code).json(cover);
        }

        // validate the model

        const userValidator = helpers.validators.user;
        let validateduser;
        if (password === awaitedUser.password) {
          validateduser = userValidator(false, {
            username: username ? $str(username) : awaitedUser.username,
            email: email ? $str(email) : awaitedUser.email,
            role_id: role_id ? $int(role_id) : awaitedUser.role_id,
          });
        }
        if (password !== awaitedUser.password) {
          validateduser = userValidator(true, {
            username: username ? $str(username) : awaitedUser.username,
            email: email ? $str(email) : awaitedUser.email,
            password: password ? $str(password) : null,
            role_id: role_id ? $int(role_id) : awaitedUser.role_id,
          });
        }

        if (validateduser.error) {
          cover = restful({ type: 0, msg: 400 })(validateduser.error.details);
          return res.status(cover.code).json(cover);
        }

        // check for the username and email uniqueness

        //username
        const uniqueUserName = await user.findOne({
          where: {
            username: username ? $str(username) : "",
            [Op.not]: { id: $str(id) },
          },
        });

        if (uniqueUserName) {
          cover = restful({ type: 0, msg: 400 })({
            message: "username is exist try another one",
            field: "username",
          });
          return res.status(cover.code).json(cover);
        }

        // email
        const uniqueEmail = await user.findOne({
          where: {
            email: email ? $str(email) : "",
            [Op.not]: { id: $str(id) },
          },
        });

        if (uniqueEmail) {
          cover = restful({ type: 0, msg: 400 })({
            message: "email is exist try another one",
            field: "email",
          });
          return res.status(cover.code).json(cover);
        }

        // update data here as user is valid

        if (password !== awaitedUser.password) {
          await awaitedUser.update({
            ...validateduser,
            updatedAt: new Date(),
            password: crypto.hash(validateduser.value.password),
          });
        }

        if (password === awaitedUser.password) {
          await awaitedUser.update({ ...validateduser, updatedAt: new Date() });
        }

        await awaitedUser.save();
        await awaitedUser.reload();

        cover = helpers.restful({ type: 1, msg: 200 })(awaitedUser);
        return res.status(cover.code).json(cover);
      } catch (e) {
        return next(e);
      }
    },
    async delete(req, res, next) {
      try {
        const { id } = req.body;
        const { sanitizer } = helpers;
        const { $int } = sanitizer;
        const { user } = db;
        const errors = [];
        let cover;

        if (!id) {
          errors.push("id is required !");
        }

        // check if exist
        const UserInstance = await user.findOne({ where: { id: $int(id) } });

        if (!UserInstance) {
          errors.push("this user is not exist or maybe deleted !");
          cover = helpers.restful({ type: 0, msg: 404 })(errors);
          return res.status(cover.code).json(cover);
        }
        await UserInstance.destroy();
        cover = helpers.restful({ type: 1, msg: 200 })({
          message: "deleted successfully",
        });
        return res.status(cover.code).json(cover);
      } catch (e) {
        return next(e);
      }
    },
  };
};

module.exports = ({ helpers, db }) => {
  return usersController({ helpers, db });
};
