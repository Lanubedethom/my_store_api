const { Order } = require('../db/models/order.model');
const boom = require("@hapi/boom");
const {OrderProduct} = require("../db/models/order_product.model");

class OrderService {
  async find() {
    return await Order.findAll();
  }

  async findOne(id) {
    const order = await Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items',
      ]
    });
    if (!order) {
      throw boom.notFound('Order not found');
    }

    return Order;
  }

  async findByUser(userId) {
    const orders = await Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [
        {
          association: 'customer',
          include: ['user']
        }
      ]
    });
    return orders;
  }

  async create(data) {
    return await Order.create(data);
  }

  async addItem(data) {
    return await OrderProduct.create(data);
  }

  async update(id, change) {
    const order = await this.findOne(id);
    return await order.update(change);
  }

  async delete(id) {
    const order = await this.findOne(id);
    await order.destroy();
    return { id };
  }
}

module.exports = {
  OrderService
}
