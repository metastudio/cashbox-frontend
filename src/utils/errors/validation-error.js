class ValidationError extends Error {
  constructor(errors) {
    super('validation error');

    // https://github.com/babel/babel/issues/3083
    this.constructor = ValidationError;
    this.__proto__   = ValidationError.prototype;

    this.errors = errors;
  }
}

export default ValidationError;
