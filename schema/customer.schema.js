const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string().min(4).max(12);
const lastName = Joi.string().min(4).max(15);
const phone = Joi.string();
const userId = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"));
const role = Joi.string().min(5);

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: Joi.object({
    email: email.required(),
    password: password.required(),
    role: role
  })
});

const updateCustomerSchema = Joi.object({
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
