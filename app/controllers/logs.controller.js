module.exports = ({ helpers }) => {
  return {
    async find(req, res, next) {
      try {
        const { logger, restful, sanitizer } = helpers;
        const { id } = req.params;
        const loggerHelper = logger("./logs/http.log");
        let cover;

        if (!id) {
          cover = restful({ type: 0, msg: 400 })(["id is required"]);
          return res.status(cover.code).json(cover);
        }

        cover = restful({ type: 1, msg: 302 })(
          loggerHelper.find({ id: sanitizer.$str(id) })
        );

        return res.status(cover.code).json(cover);
      } catch (e) {
        return next(e);
      }
    },
    async index(req, res, next) {
      try {
        const { logger, restful } = helpers;
        const loggerHelper = logger("./logs/http.log");
        let cover;
        cover = restful({ type: 1, msg: 200 })(loggerHelper.all());

        console.log(cover);
        return res.status(cover.code).json(cover);
      } catch (e) {
        return next(e);
      }
    },
    async delete(req, res, next) {
      try {
        const { logger, restful, sanitizer } = helpers;
        const { id } = req.params;
        const loggerHelper = logger("./logs/http.log");
        let cover;

        if (!id) {
          cover = restful({ type: 0, msg: 400 })(["id is required"]);
          return res.status(cover.code).json(cover);
        }
        loggerHelper.deleteRecord({ id: sanitizer.$str(id) });

        cover = restful({ type: 1, msg: 200 })(["deleted successfully"]);
        return res.status(cover.code).json(cover);
      } catch (e) {
        return next(e);
      }
    },
  };
};
