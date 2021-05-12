const { body } = require('express-validator');

module.exports = body('name')
  .trim()
  .notEmpty()
  .withMessage('Campo obligatorio')
  .bail()
  .isLength({ min: 3 })
  .withMessage('Debe tener 3 caracteres');
