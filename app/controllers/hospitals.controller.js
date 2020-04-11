class hospitals {
  constructor({ helpers, db }) {
    this.context = db;
    this.helpers = helpers;
  }
  async index(req, res, next) {
    res.json({});
  }
  async find(req, res, next) {}
}

module.exports = ({ helpers, db }) => {
  return new hospitals({ helpers, db });
};
