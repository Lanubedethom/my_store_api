const { faker } = require("@faker-js/faker");
const boom = require("@hapi/boom");
const { Customer } = require('../db/models/customer.model');
const bcrypt = require('bcrypt');

class CustomersService {
  constructor() {
    this.user = [];
    this.generate();
    //this.pool = pool;
    //this.pool.on('error', (err) => console.error(err));
  }

  generate() {
    const limit = 10;
    for (let i = 0; i < limit; i++) {
      this.user.push({
        id: faker.datatype.uuid(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: faker.name.jobTitle(),
      });
    }
  }

  async find() {
    return await Customer.findAll({
      include: ['user']
    });
  };

  async findOne(id) {
    const customer = await Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('user not found');
    }
    return customer;
  };

  async create(data) {
    const hash = await bcrypt.hash(data.user.password, 10);
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hash
      }
    }
    return await Customer.create(newData, {
      include: ['user']
    });
  }

  async update(id, data) {
    const customer = await this.findOne(id);
    return await customer.update(data);
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();
    return { id };
  }
}

module.exports = {
  CustomersService
}
