class HttpError extends Error {
  public readonly code:     number;
  public readonly response: Response;

  constructor(response: Response) {
    super(response.statusText);
    this.code     = response.status;
    this.response = response;
  }
}

export default HttpError;
