const { Op } = require("sequelize");
const rolesController = ({ helpers, db }) => {
  return {
    async index(req, res, next) {
      try {
        const { role } = db;
        let cover;
        const roles = await role.findAll();
        cover = helpers.restful({ type: 1, msg: 200 })(roles || "");
        return res.status(cover.code).json(cover);
      } catch (e) {
        return next(e);
      }
    },
    async find(req, res, next) {
      try {
        const { role } = db;
        const { id } = req.params;
        let cover;
        const $role = await role.findOne({
          where: { id: helpers.sanitizer.$int(id) },
        });
        if (!$role) {
          cover = helpers.restful({ type: 0, msg: 404 })([
            "maybe this role deleted or not exist",
          ]);
          return res.status(cover.code).json(cover);
        }
        cover = helpers.restful({ type: 1, msg: 302 })($role);
        return res.status(cover.code).json(cover);
      } catch (e) {
        return next(e);
      }
    },
    async create(req, res, next) {
      try {
        const { title } = req.body;
        const { v, sanitizer } = helpers;
        const { $str } = sanitizer;
        const { role } = db;
        const errors = [];
        let cover;
        if (!title) {
          errors.push("title is missing");
        }

        if (!v.isLength(title || "", { min: 4, max: 18 })) {
          errors.push("title should at least 4 chars and at maxmimum 18");
        }

        // unqiueness

        if (await role.findOne({ where: { title: $str(title) || "" } })) {
          errors.push("this title is exist try another one");
        }

        if (errors.length) {
          cover = helpers.restful({ type: 0, msg: 400 })(errors);
          return res.status(cover.code).json(cover);
        }

        const newRole = await role.create({ title: $str(title) });
        cover = helpers.restful({ type: 1, msg: 201 })(newRole);

        return res.status(cover.code).json(cover);
      } catch (e) {
        return next(e);
      }
    },

    async update(req, res, next) {
      try {
        const { id, title } = req.body;
        const { sanitizer, v } = helpers;
        const { $str, $int } = sanitizer;
        const { role } = db;
        const errors = [];
        let cover;
        if (!id) {
          errors.push("id is required !");
        }

        // check if exist
        const RoleInstance = await role.findOne({ where: { id: $int(id) } });

        if (!RoleInstance) {
          errors.push("this role is not exist");
          cover = helpers.restful({ type: 0, msg: 404 })(errors);
          return res.status(cover.code).json(cover);
        }

        // check for title
        if (!title) {
          errors.push("title is required !");
        }

        if (!String(title)) {
          errors.push("title should only string !");
        }

        if (!v.isLength(title || "", { min: 4, max: 18 })) {
          errors.push("title should at least 4 chars and at maxmimum 18");
        }

        // check if unique
        const uniqueRole = await role.findOne({
          where: { title: $str(title), [Op.not]: { id: $int(id) } },
        });

        if (uniqueRole) errors.push("title is exist try another one");

        if (!errors) {
          RoleInstance.title = $str(title);
          await RoleInstance.save();
          await RoleInstance.reload();
          cover = helpers.restful({ type: 1, msg: 200 })(RoleInstance);
          return res.status(cover.code).json(cover);
        }
        cover = helpers.restful({ type: 0, msg: 400 })([...errors]);

        return res.status(cover.code).json(cover);
      } catch (e) {
        return next(e);
      }
    },
    async delete(req, res, next) {
      try {
        const { id } = req.body;
        const { role } = db;
        const errors = [];
        let cover;

        if (!id) {
          errors.push("id is required !");
        }

        console.log(req.body);
        // check if exist
        const RoleInstance = await role.findOne({ where: { id: Number(id) } });

        if (!RoleInstance) {
          errors.push("this role is not exist or maybe deleted !");
          cover = helpers.restful({ type: 0, msg: 404 })(errors);
          return res.status(cover.code).json(cover);
        }
        await RoleInstance.destroy();
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
  return rolesController({ helpers, db });
};
