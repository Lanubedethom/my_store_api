const { User, UserSchema } = require("./user.model.js");
const { Customer, CustomerSchema} = require('./customer.model');

const setupModels = (sequelize) => {
  User.init(UserSchema, User.config(sequelize));
  User.init(CustomerSchema, Customer.config(sequelize));

  Customer.associate();
};

module.exports = {
  setupModels
};

