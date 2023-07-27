const config = require("./config/config.js");
const express = require("express");
const { routerApi }= require("./routes/index.js");
const {
  logError,
  handlerError,
  ormValidationError,
} = require("./middleware/errorHandler.js");
const { errorBoomHandler } = require("./middleware/errorBoomHandler.js");
const {checkApiKey} = require("./middleware/auth.handler");

const app = express();

app.use(express.json());


require('./utils/index');

app.get('/nueva-ruta', checkApiKey, (req, res) => {
  res.send('hola, soy una nueva ruta')
})

routerApi(app);

//middlewares
app.use(logError);
app.use(ormValidationError);
app.use(errorBoomHandler);
app.use(handlerError);

app.listen(config.port, () => {
  console.log(`Escuchando desde el puerto ${config.port}...`);
});

