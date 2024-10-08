'use strict';

const {USER_TABLE, UserSchema} = require("../models/user.model");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(USER_TABLE, 'role', UserSchema.role);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(USER_TABLE, 'role');
  }
};



