const Joi = require("joi");

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"));
const role = Joi.string().min(5);

const createUserSchemna = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role
});

const updateUserSchema = Joi.object({
  email: email,
  role: role,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createUserSchemna,
  updateUserSchema,
  getUserSchema
};
