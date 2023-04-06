import routerUser from './users.router.js';
import routerProduct from './product.router.js'
import { Router } from "express";

const routerApi = (app) => {
  const router = Router();
  app.use('/api/v1', router)
  router.use('/users', routerUser);
  router.use('/products', routerProduct);
};

export default routerApi;

