"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      username: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      role_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {}
  );
  user.associate = function (models) {
    // associations can be defined here
    user.role = user.belongsTo(models.role, {
      onUpdate: "cascade",
      onDelete: "cascade",
      foreignKey: "role_id",
    });
  };
  return user;
};
