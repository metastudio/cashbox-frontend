class HttpError extends Error {
  constructor(response) {
    super(response.statusText);

    // https://github.com/babel/babel/issues/3083
    this.constructor = ValidationError;
    this.__proto__   = ValidationError.prototype;

    this.code     = response.status;
    this.response = response;
  }
}

class ValidationError extends Error {
  constructor(errors) {
    super('validation error');

    // https://github.com/babel/babel/issues/3083
    this.constructor = ValidationError;
    this.__proto__   = ValidationError.prototype;

    this.errors = errors;
  }
}

export { HttpError, ValidationError };
