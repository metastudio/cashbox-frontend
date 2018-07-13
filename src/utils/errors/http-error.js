class HttpError extends Error {
  constructor(response) {
    super(response.statusText);
    this.code     = response.status;
    this.response = response;
  }
}

export default HttpError;
