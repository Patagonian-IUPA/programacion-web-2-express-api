const express = require('express');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const database = require('../database');

const authRouting = express.Router();

authRouting.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Obtenemos el usuario buscando por USUARIO Y CONTRASEÑA
  const user = database
    .search({
      username,
      password,
    })
    .pop();

  if (user) {
    // Usuario válido
    const accessToken = jwt.sign(
      {
        username,
        id: user.id,
      },
      JWT_SECRET,
      {
        expiresIn: '1m',
      }
    );

    res.json({
      status: 'success',
      accessToken,
    });
  } else {
    // Usuario inválido
    res.status(401).json({
      status: 'error',
      error: 'Usuario o contraseña incorrecto',
    });
  }
});

module.exports = authRouting;
