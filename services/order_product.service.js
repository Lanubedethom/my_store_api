const { OrderProduct } = require('../db/models/order_product.model')
const boom = require("@hapi/boom");

class OrderProductService {

  async find() {
    return await OrderProduct.findAll();
  }

  async findOne(id) {
    const order_product = await OrderProduct.findByPk(id);
    if (!order_product) {
      throw boom.notFound('Order product not found');
    }
    return order_product;
  }

  async create(data) {
    return await OrderProduct.create(data);
  }

  async update(id, change) {
    const order_product = await this.findOne(id);
    return await order_product.update(change);
  };

  async delete(id) {
    const order_product = await this.findOne(id);
    await order_product.destroy();
    return { id };
  }
}

module.exports = {
  OrderProductService
}
