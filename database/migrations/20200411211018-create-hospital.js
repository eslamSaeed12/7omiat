"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("hospitals", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        unqiue: true,
        allowNull: false,
      },
      telephone: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      fullDescription: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      coords: {
        type: Sequelize.GEOMETRY("POINT"),
        allowNull: false,
      },
      gov_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "governments",
          key: "id",
          onDelete: "cascade",
          onUpdate: "cascade",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("hospitals");
  },
};
