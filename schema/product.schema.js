import Joi from 'joi';

const id = Joi.string().uuid();
const name = Joi.string().min(6).max(12);
const price = Joi.number();
const image = Joi.string().uri();

export const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required()
})

export const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image
});

export const getProductSchema = Joi.object({
  id: id.required()
});




