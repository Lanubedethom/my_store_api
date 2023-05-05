const config = require("./config/config.js");
const express = require("express");
const { routerApi }= require("./routes/index.js");
const {
  logError,
  handlerError,
  ormValidationError,
} = require("./middleware/errorHandler.js");
const { errorBoomHandler } = require("./middleware/errorBoomHandler.js");

const app = express();

app.use(express.json());

routerApi(app);

//middlewares
app.use(logError);
app.use(ormValidationError);
app.use(errorBoomHandler);
app.use(handlerError);

app.listen(config.port, () => {
  console.log(`Escuchando desde el puerto ${config.port}...`);
});
