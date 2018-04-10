import { SubmissionError } from 'redux-form';
import { ValidationError } from 'api/errors.js';

const prepareSubmissionError = (error) => {
  throw new SubmissionError(error instanceof ValidationError ? error.errors : { _error: error.message });
};

export { prepareSubmissionError };
