module.exports = ({ helpers, db }) => {
  return {
    logs: require("./logs.controller")({ helpers }),
    hospitals: require("./hospitals.controller")({
      helpers,
      db,
    }),
    auth: require("./auth.controller")({
      helpers,
      db,
    }),
    role: require("./roles.controller")({
      helpers,
      db,
    }),
    government: require("./governments.controller")({
      helpers,
      db,
    }),
    user: require("./user.controller")({
      helpers,
      db,
    }),
  };
};
