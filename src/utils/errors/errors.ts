import { SubmissionError } from 'redux-form';
import ValidationError from './validation-error';

const prepareSubmissionError = (error: Error) => {
  throw new SubmissionError(error instanceof ValidationError ? error.errors : { _error: error.message });
};

export { prepareSubmissionError };
