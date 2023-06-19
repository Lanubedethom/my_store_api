'use strict';

const { CustomerSchema, CUSTOMER_TABLE } = require('../models/customer.model')
const { DataTypes } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id', {
      field: 'user_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    //await queryInterface.removeColumn(CUSTOMER_TABLE, 'updated_at');
  },
};
