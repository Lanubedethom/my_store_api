const routerUser = require("./users.router.js");
const routerProduct = require("./product.router.js");
const Router = require('express');
const routerCustomer = require('./customers.router.js');

const routerApi = (app) => {
  const router = Router();
  app.use("/api/v1", router);
  router.use("/users", routerUser);
  router.use("/products", routerProduct);
  router.use('/customers', routerCustomer);
};

module.exports = {
  routerApi
};



