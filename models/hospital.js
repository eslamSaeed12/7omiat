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
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      fullDescription: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      coords: {
        type: DataTypes.GEOMETRY("POINT"),
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
  };
  return hospital;
};
