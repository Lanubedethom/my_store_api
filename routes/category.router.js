const { Router } = require('express');
const { CategoryService } = require('../services/category.service');
const {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
} = require('../schema/category.schema');
const { handleValidation } = require('../middleware/handleValidation');
const { checkAdminRole } = require('../middleware/auth.handler');
const { checkRoles } = require('../middleware/auth.handler');
const passport = require('passport');

const router = Router();
const service = new CategoryService();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller'),
  async (req, res, next) => {
    try {
      const response = await service.find();
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller'),
  handleValidation(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller'),
  handleValidation(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const category = await service.create(body);
      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller'),
  handleValidation(getCategorySchema, 'params'),
  handleValidation(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const { id } = req.params;
      const changeCategory = await service.update(id, body);
      res.json(changeCategory);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller'),
  handleValidation(getCategorySchema, 'params'),
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
