"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("meet_greet", {
      meet_greet_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      event_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      band_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      meet_start: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      meet_end: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("meet_greet");
  },
};
