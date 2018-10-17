class ValidationError extends Error {
  public readonly errors: {};

  constructor(errors: {}) {
    super('validation error');

    // https://github.com/babel/babel/issues/3083
    this.constructor = ValidationError;
    Object.setPrototypeOf(this, ValidationError.prototype);

    this.errors = errors;
  }
}

export default ValidationError;
