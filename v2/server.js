const express = require('express');
const usersAPI = require('./src/usersAPI');
const { APP_PORT } = require('./src/config');

const app = express();

app.use(express.json());

app.use('/api/users', usersAPI);

app.use(express.static('./publico'));

app.listen(APP_PORT, () => {
  console.info('Server v2:');
});

// src => SouRCes
