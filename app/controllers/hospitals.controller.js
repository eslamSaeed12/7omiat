const { Op } = require("sequelize");

const hospitalsController = ({ helpers, db }) => {
  return {
    async index(req, res, next) {
      try {
        const { hospital } = db;
        let cover;
        const hospitals = await hospital.findAll({
          include: ["government", "user"],
        });
        cover = helpers.restful({ type: 1, msg: 302 })(hospitals || []);
        return res.status(cover.code).json(cover);
      } catch (e) {
        return next(e);
      }
    },
    async find(req, res, next) {
      try {
        const { hospital } = db;
        const { id } = req.params;
        let cover;
        const $hospital = await hospital.findOne({
          where: { id: helpers.sanitizer.$int(id) },
        });
        if (!$hospital) {
          cover = helpers.restful({ type: 0, msg: 404 })([
            "maybe this hospital deleted or not exist",
          ]);
          return res.status(cover.code).json(cover);
        }
        cover = helpers.restful({ type: 1, msg: 302 })($hospital);
        return res.status(cover.code).json(cover);
      } catch (e) {
        return next(e);
      }
    },
    async create(req, res, next) {
      try {
        const {
          name,
          telephone,
          fullDescription,
          coords,
          gov_id,
          created_by,
        } = req.body;

        const { sanitizer, restful, v } = helpers;
        const { $str, $int } = sanitizer;
        let cover;
        const { hospital, government } = db;
        const hospValidator = helpers.validators.hospital;
        const validatedHospital = hospValidator({
          name: $str(name || null),
          telephone: "0" + String($int(telephone || null)),
          fullDescription: $str(fullDescription) || null,
          coords: Object.keys(coords || {}).length === 2 ? coords : {},
          gov_id: $int(gov_id || null),
        });

        if (validatedHospital.error) {
          cover = restful({ type: 0, msg: 400 })(
            validatedHospital.error.details
          );
          return res.status(cover.code).json(cover);
        }

        // const other errors like [uniqueness,government existance]
        const uniqueTitle = await hospital.findOne({
          where: { name: $str(name || "") },
        });

        if (uniqueTitle) {
          cover = restful({ type: 0, msg: 400 })([
            "this name is exist try another title",
          ]);
          return res.status(cover.code).json(cover);
        }

        // check gov exist or not
        const validatedGov = await government.findOne({
          where: { id: $int(gov_id) },
        });

        if (!validatedGov) {
          cover = restful({ type: 0, msg: 400 })([
            "this government is not exist or maybe deleted",
          ]);
          return res.status(cover.code).json(cover);
        }

        if (!created_by) {
          cover = restful({ type: 0, msg: 400 })(["createdBy is required"]);
          return res.status(cover.code).json(cover);
        }
        // now create the hospital
        const newHospital = await hospital.create({
          name: validatedHospital.value.name,
          telephone: validatedHospital.value.telephone,
          fullDescription: validatedHospital.value.fullDescription,
          coords: validatedHospital.value.coords,
          gov_id: $int(gov_id),
          created_by: $str(created_by),
        });

        cover = restful({ type: 1, msg: 201 })(newHospital);
        return res.status(cover.code).json(cover);
      } catch (e) {
        return next(e);
      }
    },
    async update(req, res, next) {
      try {
        const {
          id,
          name,
          telephone,
          fullDescription,
          coords,
          gov_id,
          updated_by,
        } = req.body;

        const { sanitizer, restful } = helpers;
        const { $str, $int } = sanitizer;
        const { hospital, government } = db;
        let cover;

        if (!id) {
          cover = restful({ type: 0, msg: 404 })([
            "this hospital id is required",
          ]);
          return res.status(cover.code).json(cover);
        }

        // check if the id exist

        const awaitedHospital = await hospital.findOne({
          where: { id: $int(id) },
        });

        if (!awaitedHospital) {
          cover = helpers.restful({ type: 0, msg: 404 })([
            "this hospital is not exist",
          ]);

          return res.status(cover.code).json(cover);
        }

        // here should validate

        const hospValidator = helpers.validators.hospital;
        const validatedHospital = hospValidator({
          name: name ? $str(name) : awaitedHospital.name,
          telephone: telephone
            ? String($int(telephone))
            : String($int(awaitedHospital.telephone)),
          fullDescription: fullDescription
            ? $str(fullDescription)
            : awaitedHospital.fullDescription,
          coords: coords ? coords : awaitedHospital.coords,
          gov_id: gov_id ? $int(gov_id) : awaitedHospital.gov_id,
        });

        if (validatedHospital.error) {
          cover = restful({ type: 0, msg: 400 })(
            validatedHospital.error.details
          );
          return res.status(cover.code).json(cover);
        }

        // validate governemeent

        const awaitedGov = await government.findOne({
          where: { id: $int(validatedHospital.value.gov_id || 0) },
        });

        if (!awaitedGov) {
          cover = restful({ type: 0, msg: 400 })(["governament is not exist"]);
          return res.status(cover.code).json(cover);
        }

        // check if unique
        const uniqueHosptial = await hospital.findOne({
          where: { name: $str(name), [Op.not]: { id: $int(id) } },
        });

        if (uniqueHosptial) {
          cover = restful({ type: 0, msg: 400 })([
            "hospital name is exist try another one",
          ]);
          return res.status(cover.code).json(cover);
        }

        const userUpdatedBy = db.user.findOne({
          where: { id: $str(updated_by) },
        });
        if (!userUpdatedBy) {
          cover = restful({ type: 0, msg: 400 })([
            "updated_by user is not exist",
          ]);
          return res.status(cover.code).json(cover);
        }
        // no problem with unqiue
        await awaitedHospital.update({
          ...validatedHospital.value,
          updated_by: $str(updated_by) || null,
        });

        await awaitedHospital.save();
        await awaitedHospital.reload();

        cover = helpers.restful({ type: 1, msg: 200 })(awaitedHospital);
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
        const { hospital } = db;
        const errors = [];
        let cover;

        if (!id) {
          errors.push("id is required !");
        }

        // check if exist
        const hospitalInstance = await hospital.findOne({
          where: { id: $int(id) },
        });

        if (!hospitalInstance) {
          errors.push("this hospital is not exist or maybe deleted !");
          cover = helpers.restful({ type: 0, msg: 404 })(errors);
          return res.status(cover.code).json(cover);
        }
        await hospitalInstance.destroy();
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
  return hospitalsController({ helpers, db });
};
