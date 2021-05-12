const database = require('../../database');
const validateName = require('../../validations/user/validateName');
const validateAge = require('../../validations/user/validateAge');
const validateErrors = require('../../validations/validateErrors');

/**
 * POST /api/users
 *
 * name: obligatorio, debe tener por lo menos 3 caracteres
 * age: obligatorio
 */
module.exports = (route) => {
  route.post('/', validateName, validateAge, validateErrors, (req, res) => {
    const name = req.body.name;
    const age = req.body.age;

    const user = database.add({
      name: name.trim(),
      age: parseInt(age),
    });

    res.json(user);
  });
};
