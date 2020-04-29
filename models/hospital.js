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
      created_by: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: "user",
          key: "id",
        },
      },
      updated_by: {
        allowNull: false,
        type: DataTypes.UUID,
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

    hospital.creator = hospital.belongsTo(models.user, {
      onDelete: "cascade",
      onUpdate: "cascade",
      foreignKey: "created_by",
    });

    hospital.updator = hospital.belongsTo(models.user, {
      onDelete: "cascade",
      onUpdate: "cascade",
      foreignKey: "updated_by",
    });
    
  };
  return hospital;
};
