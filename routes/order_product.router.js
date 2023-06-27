const { Router } = require('express');
const { OrderProductService } = require('../services/order_product.service');
const {
  createOrderProductSchema,
  updateOrderProductSchema,
  getOrderProductSchema,
} = require('../schema/order_product.schema');
const { handleValidation } = require("../middleware/handleValidation.js");
const {UsersService} = require("../services/users.service");
const {getUserSchema, createUserSchemna, updateUserSchema} = require("../schema/user.schema");
const {getOrderSchema} = require("../schema/order.schema");

const router = Router();
const service = new OrderProductService();

router.get("/", async (req, res, next) => {
  try {
    const response = await service.find();
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  handleValidation(getOrderProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order_product = await service.findOne(id);
      res.json(order_product);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  handleValidation(createOrderProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrderProduct = await service.create(body);
      res.status(201).json(newOrderProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  handleValidation(getOrderProductSchema, 'params'),
  handleValidation(updateOrderProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const order_product = await service.update(id, body);
      res.json(order_product);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  handleValidation(getOrderProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;


