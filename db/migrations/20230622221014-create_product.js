'use strict';

const { CATEGORY_TABLE, CategorySchema } = require('../models/category.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(CATEGORY_TABLE);
  }
};
