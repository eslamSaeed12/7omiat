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

        const log = loggerHelper.find({ id: sanitizer.$str(id) });

        if (!log) {
          cover = restful({ type: 0, msg: 404 })([
            "this log not exist or maybe deleted ",
          ]);

          return res.status(cover.code).json(cover);
        }

        cover = restful({ type: 1, msg: 302 })(log);

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
        return res.status(cover.code).json(cover);
      } catch (e) {
        return next(e);
      }
    },
    async delete(req, res, next) {
      try {
        const { logger, restful, sanitizer } = helpers;
        const { id } = req.body;
        const loggerHelper = logger("./logs/http.log");
        let cover;

        if (!id) {
          cover = restful({ type: 0, msg: 400 })(["id is required"]);
          return res.status(cover.code).json(cover);
        }

        // check for id
        const checkForID = loggerHelper.find({ id: sanitizer.$str(id) });
        if (!checkForID) {
          cover = restful({ type: 1, msg: 404 })([
            "item is not exist or maybe delted ",
          ]);
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
