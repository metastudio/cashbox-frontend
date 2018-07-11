import { SubmissionError } from 'redux-form';
import ValidationError from './validation-error.js';

const prepareSubmissionError = (error) => {
  throw new SubmissionError(error instanceof ValidationError ? error.errors : { _error: error.message });
};

export { prepareSubmissionError };
