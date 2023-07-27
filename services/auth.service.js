const { UsersService } = require('./users.service')
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const service = new UsersService();
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config')
const nodemailer = require("nodemailer");

class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role
    }

    const token = jwt.sign(payload, jwtSecret)
    return {
      user,
      token
    }
  }

  async sendEmail(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'austen12@ethereal.email',
        pass: 'N4tXDNR9G4vKcajGDv'
      }
    });

    const info = await transporter.sendMail({
      from: 'austen12@ethereal.email', // sender address
      to: `${user.email}`, // list of receivers
      subject: "password lost", // Subject line
      text: "Si recibiste este mensaje, funciono todo bien", // plain text body
      html: "<b>Si recibiste este mensaje, funciono todo bien?</b>", // html body
    });

    return { message: 'mail sent'}
  }
}

module.exports = {
  AuthService
}

