const express = require('express');
const database = require('./database');

const usersAPI = express.Router();

usersAPI.get('/', (req, res) => {
  res.json(database.DB);
});

usersAPI.post('/', (req, res) => {
  const name = req.body.name;
  const age = req.body.age;

  const user = {
    name: name.trim(),
    age: parseInt(age),
  };

  database.add(user);
  res.json(user);
});

module.exports = usersAPI;
