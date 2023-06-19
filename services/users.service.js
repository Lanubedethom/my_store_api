const { faker } = require("@faker-js/faker");
const boom = require("@hapi/boom");
const { User } = require("../db/models/user.model.js");
const { sequelize } = require("../libs/sequelize.js");

class UsersService {
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
    return await User.findAll({
      include: ['customer']
    });
  }

  async findOne(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw boom.notFound("user not found");
    }
    return user;
  }

  async create(data) {
    return await User.create(data);
  }

  async update(id, change) {
    const user = await this.findOne(id);
    return await user.update(change);

    //const index = this.user.findIndex((user) => user.id === id);
    //if (index === -1) throw boom.notFound('User not found');
    //const data = this.user[index];
    //this.user[index] = {
      //...data,
      //...change,
    //};
    //return this.user[index];
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = {
  UsersService
};
