"use strict";
module.exports = (sequelize, DataTypes) => {
  const government = sequelize.define(
    "government",
    {
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    {}
  );
  government.associate = function (models) {
    // associations can be defined here
  };
  return government;
};
