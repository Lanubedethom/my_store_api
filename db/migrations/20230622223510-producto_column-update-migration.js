'use strict';

const { CATEGORY_TABLE, CategorySchema } = require('../models/category.model');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(CATEGORY_TABLE, 'updated_at', CategorySchema.updatedAt);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(CATEGORY_TABLE, 'updated_at');
  },
};
