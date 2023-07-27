const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { UsersService } = require('../../services/users.service');
const { AuthService } = require('../../services/auth.service')

const service = new AuthService();

const localStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const user = await service.getUser(email, password);
      done(null, user)
    } catch (error) {
      done(error, null);
    }
  }
);

module.exports = {
  localStrategy,
};
