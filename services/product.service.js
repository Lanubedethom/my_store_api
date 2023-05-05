const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ProductService {
  constructor() {
    this.product = [];
    this.generate();
  }

  generate() {
    const limit = 10;
    for (let i = 0; i < limit; i++) {
      this.product.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.imageUrl()
      });
    }
  }
0
  async find() {
    return this.product;
  }

  async findOne(id) {
    const item = this.product.find((item) => item.id === id);
    if (!item) throw boom.notFound('User not found');
    return item;
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    };
    this.product.push(newProduct);
    return newProduct;
  }

  async update(id, change) {
    const index = this.product.findIndex((item) => item.id === id);
    if (index === -1) throw boom.notFound();
    const data = this.product[index];
    this.product[index] = {
      ...data,
      ...change,
    };
    return this.product[index];
  }

  async delete(id) {
    const index = this.product.findIndex((item) => item.id === id);
    if (index === -1) throw boom.notFound();
    this.product.splice(index, 1);
    return { id };
  }
}

module.exports = {
  ProductService
}
