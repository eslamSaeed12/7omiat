const { Op } = require("sequelize");
const rolesController = ({ helpers, db }) => {
  return {
    async index(req, res, next) {
      try {
        const { role } = db;
        let cover;
        const roles = await role.findAll();
        cover = helpers.restful({ type: 1, msg: 200 })(roles);
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
        if (!id) res.status(400).json({ errors: ["role id is required"] });
        if (!Number(id))
          res.status(400).json({ errors: ["role id is required"] });
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
        let cover;

        if (!title) {
          return res.status(400).json({ errors: "title is required" });
        }

        if (typeof title !== "string") {
          return res.status(400).json({ errors: "title should be a string" });
        }

        if (!v.isLength(title, { min: 4, max: 18 })) {
          return res.status(400).json({
            errors: "title should at least 4 chars and at maxmimum 18",
          });
        }

        // unqiueness

        if (await role.findOne({ where: { title: $str(title) } })) {
          return res.status(400).json({
            errors: "this title is exist try another one",
          });
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
        let cover;

        if (!id) {
          return res.status(400).json({ errors: "id is required" });
        }

        if (typeof id !== "number") {
          return res.status(400).json({ errors: "id should be a number" });
        }

        // check if exist
        const RoleInstance = await role.findOne({ where: { id: $int(id) } });

        if (!RoleInstance) {
          cover = helpers.restful({ type: 0, msg: 404 })(errors);
          return res.status(cover.code).json(cover);
        }

        // check for title
        if (!title) {
          return res.status(400).json({ errors: "title is required" });
        }

        if (typeof title !== "string") {
          return res.status(400).json({ errors: "title should be a string" });
        }

        if (!v.isLength(title, { min: 4, max: 18 })) {
          return res.status(400).json({
            errors: "title should at least 4 chars and at maxmimum 18",
          });
        }
        // check if unique
        const uniqueRole = await role.findOne({
          where: { title: $str(title), [Op.not]: { id: $int(id) } },
        });

        if (uniqueRole) {
          return res.status(400).json({
            errors: "title is exist , try another title",
          });
        }
        RoleInstance.title = $str(title);
        await RoleInstance.save();
        await RoleInstance.reload();
        cover = helpers.restful({ type: 1, msg: 200 })(RoleInstance);
        return res.status(cover.code).json(cover);
      } catch (e) {
        return next(e);
      }
    },
    async delete(req, res, next) {
      try {
        const { id } = req.body;
        const { role } = db;
        let cover;

        if (!id) {
          return res.status(400).json({ errors: "id is required" });
        }

        if (typeof id !== "number") {
          return res.status(400).json({ errors: "id should be a number" });
        }
        // check if exist
        const RoleInstance = await role.findOne({ where: { id: Number(id) } });

        if (!RoleInstance) {
          return res
            .status(400)
            .json({ errors: ["this role is not exist or maybe deleted !"] });
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
