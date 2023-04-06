import { configure as config } from "./config/config.js";
import express from 'express';
import routerApi from "./routes/index.js";
import { logError, handlerError } from "./middleware/errorHandler.js";
import { errorBoomHandler } from "./middleware/errorBoomHandler.js";

const app = express();

app.use(express.json());

routerApi(app);

//middlewares
app.use(logError);
app.use(errorBoomHandler);
app.use(handlerError);

app.listen(config.port, () => {
  console.log(`Escuchando desde el puerto ${config.port}...`)
});
