const express = require('express');
const usersRouting = require('./users');
const { ValidationError } = require('../validations/validationError');

const apiRouting = express.Router();

apiRouting.use('/api', usersRouting);

apiRouting.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    // Respuesta para los errores de validación
    res.status(400).json({ errors: err.formatErrors() });
  } else {
    // Respuesta para otros errores
    res.status(500).json({ error: err.message });
  }
});

module.exports = apiRouting;
