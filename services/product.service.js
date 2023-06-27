const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { Product } = require('../db/models/product.model');

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

  async find(query) {
    const options = {
      include: ['category'],
      where: {}
    }

    const { limit, offset } = query;
    if ( limit && offset ) {
      options.limit = limit;
      options.offset = offset;
    }

    const { price } = query;
    if (price)
      options.where.price = price;

    const { price_min, price_max } = query;
    if (price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max
      }
    }

    return await Product.findAll(
      options
      // {
      //   include: ['category'],
      //   offset: 0,
      //   limit: 10
      // }
    );
  }

  async findOne(id) {
    const product = await Product.findByPk(id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    return product;
  }

  async create(data) {
    return await Product.create(data);
  }

  async update(id, change) {
    const product = await this.findOne(id);
    return await product.update(change);
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return { id };
  }
}

module.exports = {
  ProductService
}
