'use strict';

const { PRODUCT_TABLE, ProductSchema } = require('../models/product.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(PRODUCT_TABLE);
  }
};
