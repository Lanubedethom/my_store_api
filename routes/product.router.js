import { Router } from 'express';
import { ProductService } from '../services/product.service.js';
import {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} from '../schema/product.schema.js';
import { handleValidation } from '../middleware/handleValidation.js';

const router = Router();
const service = new ProductService();

router.get('/', async (req, res, next) => {
  try {
    const response = await service.find();
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  handleValidation(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  handleValidation(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  handleValidation(getProductSchema, 'params'),
  handleValidation(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  handleValidation(getProductSchema, 'params'),
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

export default router;
