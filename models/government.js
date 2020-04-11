"use strict";
module.exports = (sequelize, DataTypes) => {
  const government = sequelize.define(
    "government",
    {
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
      addedBy: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
    },
    {}
  );
  government.associate = function (models) {
    // associations can be defined here
    government.user = government.belongsTo(models.user, {
      onDelete: "cascade",
      onUpdate: "cascade",
      foreignKey: "addedBy",
    });
  };
  return government;
};
