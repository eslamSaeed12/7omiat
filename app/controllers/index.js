module.exports = ({ helpers, db, client }) => {
  return {
    hospitals: require("./hospitals.controller")({
      helpers,
      db,
      client,
    }),
    auth: require("./auth.controller")({
      helpers,
      db,
      client,
    }),
    role: require("./roles.controller")({
      helpers,
      db,
      client,
    }),
    government: require("./governments.controller")({
      helpers,
      db,
      client,
    }),
    user: require("./user.controller")({
      helpers,
      db,
      client,
    }),
  };
};
