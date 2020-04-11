"use strict";
module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define(
    "role",
    {
      title: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    {}
  );
  role.associate = function (models) {
    // associations can be defined here
  };
  return role;
};
