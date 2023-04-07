import { faker } from '@faker-js/faker';
import boom from '@hapi/boom';
import { pool } from "../libs/postgres.js";

export class UsersService {
  constructor() {
    this.user = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));

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
    const query = 'select * from tasks';
    const response = await this.pool.query(query);
    return response.rows;
  }

  async findOne(id) {
    const query = 'select * from tasks where id = $1'
    const response = await this.pool.query(query, [id]);
    //const user = this.user.find((user) => user.id === id);
    //if (!user) throw boom.notFound('User not found');
    return response.rows;
  }

  async create(data) {
    const { title, completed} = data;
    const query = 'insert into tasks (title) values ($1, $2)'
    const response = await this.pool.query(query, [title, completed]);

    /*
    const newUser = {
      id: faker.datatype.uuid(),
      ...data
    };
    this.user.push(newUser);*/
    return response[0];
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
