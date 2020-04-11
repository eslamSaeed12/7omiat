"use strict";
module.exports = (sequelize, DataTypes) => {
  const hospital = sequelize.define(
    "hospital",
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      telephone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fullDescription: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      gov_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "government",
          key: "id",
          onDelete: "cascade",
          onUpdate: "cascade",
        },
      },
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
  hospital.associate = function (models) {
    // associations can be defined here
    hospital.gov = hospital.belongsTo(models.government, {
      onDelete: "cascade",
      onUpdate: "cascade",
      foreignKey: "gov_id",
    });
    hospital.user = hospital.belongsTo(models.user, {
      onDelete: "cascade",
      onUpdate: "cascade",
      foreignKey: "addedBy",
    });
  };
  return hospital;
};
