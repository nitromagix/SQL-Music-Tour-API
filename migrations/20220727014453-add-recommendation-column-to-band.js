"use strict";

import { DataTypes } from ("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("band", "recommendation", {
      type: DataTypes.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("band", "recommendation");
  },
};
