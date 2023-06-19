const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

export class CategoryService {

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
      return this.products;
    }

    async findOne(id) {
      const item = this.products.find(item => item.id === id);
      if (!item) throw  boom.notFound('User not found');
      return item;
    }

    async create(data) {
      const newCategory = {
        id: faker.datatype.uuid(),
        ...data,
      };
      this.products.push(newCategory);
      return newCategory;
    };

    async update(id, change) {
      const index = this.products.findIndex(item => item.id === id);
      if (index === -1) throw boom.notFound('User not found');
      const data = this.products[index];
      this.products[index] = {
        ...data,
        ...change,
      };
      return this.products[index];
    };

    async delete(id){
      const index = this.products.findIndex(item => item.id === id);
      if (index === -1) throw boom.notFound('User not found');
      this.products.splice(index, 1);
      return { id };
    }
}


module.exports = {
  CategoryService
}


