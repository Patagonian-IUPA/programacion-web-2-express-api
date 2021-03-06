/**
 * Error custom con información sobre validación.
 */
class ValidationError extends Error {
  constructor(errors) {
    super();
    this.errors = errors;
  }

  formatErrors() {
    return this.errors.map((elem) => ({
      field: elem.param,
      msg: elem.msg,
    }));
  }
}

module.exports = { ValidationError };
