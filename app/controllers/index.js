module.exports = ({ helpers, db }) => {
  return {
    hospitals: require("./hospitals.controller")({ helpers, db }),
    auth: require("./auth.controller")({ helpers, db }),
    role: require("./roles.controller")({ helpers, db }),
  };
};
