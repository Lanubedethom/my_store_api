const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string().min(4).max(12);
const lastName = Joi.string().min(4).max(15);
const phone = Joi.string();
const userId = Joi.number().integer();

const createCustomerSchema = Joi.object({
  id: id.required(),
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  userId: userId.required()
});

const updateCustomerSchema = Joi.object({
  id: id,
  name: name,
  lastName: lastName,
  phone: phone,
  userId: userId
});

const getCustomerSchema = Joi.object({
  id: id.required()
});

module.exports = {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema
}
