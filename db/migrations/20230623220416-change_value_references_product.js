'use strict';

const { DataTypes, Sequelize, Model } = require('sequelize');
const { ORDER_TABLE, OrderSchema} = require('../models/order.model')
const { CUSTOMER_TABLE } = require('../models/customer.model');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(ORDER_TABLE, 'customer_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: CUSTOMER_TABLE,
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(ORDER_TABLE, 'customer_id', {
      type: DataTypes.INTEGER,
      allowNull: false
    });
  }
};
