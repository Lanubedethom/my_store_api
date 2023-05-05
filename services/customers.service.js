const { faker } = require("@faker-js/faker");
const boom = require("@hapi/boom");
const { Customer } = require('../db/models/customer.model');

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
    return await Customer.findAll();
  };

  async findOne(id) {
    const customer = await Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('user not found');
    }
    return customer;
  };

  async create(data) {
    return await Customer.create(data);
  }

  async update(id, data) {
    const customer = await this.findOne(id);
    return await Customer.update(data);
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await Customer.destroy();
    return { id };
  }
}
