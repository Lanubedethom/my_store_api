const { Router } = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config')
const { AuthService } = require('../services/auth.service')

const router = Router();
const service = new AuthService();
router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.json(service.signToken(user))
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/recovery',
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const rpt = await service.sendEmail(email);
      res.json(rpt);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
