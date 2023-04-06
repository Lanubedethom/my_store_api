import { Router } from 'express';
import { UsersService } from '../services/users.service.js';
import {
  createUserSchemna,
  getUserSchema,
  updateUserSchema,
} from '../schema/user.schema.js';
import { handleValidation } from '../middleware/handleValidation.js';

const router = Router();
const service = new UsersService();

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
  handleValidation(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  handleValidation(createUserSchemna, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  handleValidation(getUserSchema, 'params'),
  handleValidation(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await service.update(id, body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  handleValidation(getUserSchema, 'params'),
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
