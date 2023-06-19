'use strict';

const { CustomerSchema, CUSTOMER_TABLE } = require('../models/customer.model')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(CUSTOMER_TABLE, 'updated_at', CustomerSchema.updatedAt);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(CUSTOMER_TABLE, 'updated_at');
  },
};
