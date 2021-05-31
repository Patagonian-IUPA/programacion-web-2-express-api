const express = require('express');
const { PORT: APP_PORT } = require('./src/config');
const routingAPI = require('./src/handlers');
const { initDB } = require('./src/database');

const app = express();

app.use(express.json());

app.use(routingAPI);
app.use(express.static('./public'));

(async () => {
  await initDB();
  app.listen(APP_PORT, () => {
    console.info(`Oyendo en puerto ${APP_PORT}`);
  });
})();

// initDB().then(() => {
//   app.listen(PORT, () => {
//     console.info(`Escuchando en puerto ${PORT}`);
//   });
// });
