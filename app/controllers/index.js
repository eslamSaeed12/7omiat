module.exports = ({ helpers, db, gates }) => {
  return {
    logs: require("./logs.controller")({ helpers }),
    errors: require("./errors.controller")({ helpers }),
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
      gates,
    }),
  };
};
