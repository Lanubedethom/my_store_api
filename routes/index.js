const Router = require('express');
const routerUser = require("./users.router.js");
const routerProduct = require("./product.router.js");
const routerCustomer = require('./customers.router.js');
const routerCategory = require('./category.router.js');
const routerOrder = require('./order.router');
const routerOrderProduct = require('./order_product.router');
const routerAuth = require('./auth.router');
const routerProfile = require('./profile.router')

const routerApi = (app) => {
  const router = Router();
  app.use("/api/v1", router);
  router.use("/users", routerUser);
  router.use("/products", routerProduct);
  router.use('/customers', routerCustomer);
  router.use('/category', routerCategory);
  router.use('/orders', routerOrder);
  router.use('/orderProducts', routerOrderProduct);
  router.use('/auth', routerAuth);
  router.use('/profile', routerProfile);
};

module.exports = {
  routerApi
};





