const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const { Category } = require('../db/models/category.model');

class CategoryService {

    constructor() {
        this.products = [];
        this.generate();
    };

    generate() {
        const limit = 10;
        for (let i = 0; i < limit; i++) {
          this.products.push({
            id: faker.datatype.uuid(),
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            image: faker.image.imageUrl()
          })
      }
    };

    async find() {
      return await Category.findAll();
    }

    async findOne(id) {
      const category = await Category.findByPk(id, {
        include: ['products']
      });
      if (!category) {
        throw boom.notFound('Category not found');
      }
      return category;
    }

    async create(data) {
      return await Category.create(data);
    };

    async update(id, change) {
      const category = await this.findOne(id);
      return await category.update(change);
    };

    async delete(id){
      const category = await this.findOne(id);
      await category.destroy();
      return { id };
    }
}


module.exports = {
  CategoryService
}


