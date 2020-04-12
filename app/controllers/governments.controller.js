const { Op } = require("sequelize");
const govsController = ({ helpers, db }) => {
  return {
    async index(req, res, next) {
      try {
        const { government } = db;
        let cover;
        const governments = await government.findAll();
        if (!governments.length) {
          cover = helpers.restful({ type: 0, msg: 404 })([
            "no governments added in database yet",
          ]);
          return res.status(cover.code).json(cover);
        }
        cover = helpers.restful({ type: 1, msg: 302 })(governments);
        return res.status(cover.code).json(cover);
      } catch (e) {
        return next(e);
      }
    },
    async find(req, res, next) {
      try {
        const { government } = db;
        const { id } = req.params;
        let cover;
        const $government = await government.findOne({
          where: { id: helpers.sanitizer.$int(id) },
        });
        if (!$government) {
          cover = helpers.restful({ type: 0, msg: 404 })([
            "maybe this government deleted or not exist",
          ]);
          return res.status(cover.code).json(cover);
        }
        cover = helpers.restful({ type: 1, msg: 302 })($government);
        return res.status(cover.code).json(cover);
      } catch (e) {
        return next(e);
      }
    },
    async create(req, res, next) {
      try {
        const { name } = req.body;
        const { v, sanitizer } = helpers;
        const { $str } = sanitizer;
        const { government } = db;
        const errors = [];
        let cover;
        if (!name) {
          errors.push("name is required !");
        }

        if (!v.isLength(name || "", { min: 4, max: 18 })) {
          errors.push("name should at least 6 chars and at maxmimum 18");
        }

        // unqiueness

        if (await government.findOne({ where: { name: $str(name) || "" } })) {
          errors.push("this name is exist try another one");
        }

        if (errors.length) {
          cover = helpers.restful({ type: 0, msg: 400 })(errors);
          return res.status(cover.code).json(cover);
        }

        const newgovernment = await government.create({
          name: $str(name),
        });

        cover = helpers.restful({ type: 1, msg: 201 })(newgovernment);

        return res.status(cover.code).json(cover);
      } catch (e) {
        return next(e);
      }
    },

    async update(req, res, next) {
      try {
        const { id, name } = req.body;
        const { sanitizer } = helpers;
        const { $str, $int } = sanitizer;
        const { government } = db;
        const errors = [];
        let cover;
        if (!id) {
          errors.push("id is required !");
        }

        // check if exist
        const governmentInstance = await government.findOne({
          where: { id: $int(id) },
        });

        if (!governmentInstance) {
          errors.push("this government is not exist");
          cover = helpers.restful({ type: 0, msg: 404 })(errors);
          return res.status(cover.code).json(cover);
        }

        // check for name
        if (!name) {
          errors.push("name is required !");
        }

        if (String(name)) {
          errors.push("name should only string !");
        }

        if (!v.isLength(name || "", { min: 4, max: 18 })) {
          errors.push("name should at least 6 chars and at maxmimum 18");
        }

        // check if unique
        const uniquegovernment = await government.findOne({
          where: { name: $str(name), [Op.not]: { id: $int(id) } },
        });

        if (uniquegovernment) errors.push("name is exist try another one");

        governmentInstance.name = $str(name);
        await governmentInstance.save();
        await governmentInstance.reload();
        cover = helpers.restful({ type: 1, msg: 200 })(governmentInstance);
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
        const { government } = db;
        const errors = [];
        let cover;

        if (!id) {
          errors.push("id is required !");
        }

        // check if exist
        const governmentInstance = await government.findOne({
          where: { id: $int(id) },
        });

        if (!governmentInstance) {
          errors.push("this government is not exist or maybe deleted !");
          cover = helpers.restful({ type: 0, msg: 404 })(errors);
          return res.status(cover.code).json(cover);
        }
        await governmentInstance.destroy();
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
  return govsController({ helpers, db });
};
