"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("event_stage", {
      event_stage_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      event_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      stage_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("event_stage");
  },
};
