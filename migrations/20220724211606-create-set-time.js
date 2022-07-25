"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("set_time", {
      set_time_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      event_stage_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      band_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      st_time_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("set_time");
  },
};
