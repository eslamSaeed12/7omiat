module.exports = ({ helpers, db }) => {
  return {
    hospitals: require("./hospitals.controller")({ helpers, db }),
  };
};
