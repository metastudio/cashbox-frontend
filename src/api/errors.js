class HttpError extends Error {
  constructor(response) {
    super(response.statusText);
    this.code     = response.status;
    this.response = response;
  }
}

class ValidationError extends Error {
  constructor(errors) {
    super('validation error');
    this.errors = errors;
  }
}

export { HttpError, ValidationError };
