import { faker } from '@faker-js/faker';
import boom from '@hapi/boom';

export class UsersService {
  constructor() {
    this.user = [];
    this.generate();
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
    return this.user;
  }

  async findOne(id) {
    const user = this.user.find((user) => user.id === id);
    if (!user) throw boom.notFound('User not found');
    return user;
  }

  async create(data) {
    const newUser = {
      id: faker.datatype.uuid(),
      ...data
    };
    this.user.push(newUser);
    return newUser;
  }

  async update(id, change) {
    const index = this.user.findIndex((user) => user.id === id);
    if (index === -1) throw boom.notFound('User not found');
    const data = this.user[index];
    this.user[index] = {
      ...data,
      ...change,
    };
    return this.user[index];
  }

  async delete(id) {
    const index = this.user.findIndex((user) => user.id === id);
    if (index === -1) throw boom.notFound('User not found');
    this.user.splice(index, 1);
    return { id };
  }
}
