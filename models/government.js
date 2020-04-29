"use strict";
module.exports = (sequelize, DataTypes) => {
  const government = sequelize.define(
    "government",
    {
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
      created_by: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.UUID,
        allowNull: true,
      },
    },
    {
      name: {
        singular: "government",
        plural: "governments",
      },
    }
  );
  government.associate = function (models) {
    // associations can be defined here

    government.creator = government.belongsTo(models.user, {
      foreignKey: "created_by",
      as: "creator",
    });

    government.updator = government.belongsTo(models.user, {
      foreignKey: "updated_by",
      as: "updator",
    });
  };
  return government;
};
