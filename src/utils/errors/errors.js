import { SubmissionError } from 'redux-form';
import ValidationError from './validation-error.js';
import { ApolloError } from 'apollo-client';

const prepareSubmissionError = (error) => {
  throw new SubmissionError(error instanceof ValidationError ? error.errors : { _error: error.message });
};

const appollorErrorToSubmission = (error) => {
  if (error instanceof ApolloError
    && error.graphQLErrors
    && error.graphQLErrors.length > 0
    && error.graphQLErrors[0].validationErrors) {
    throw new SubmissionError(error.graphQLErrors[0].validationErrors)
  }

  throw new SubmissionError({ _error: error.message })
}

export { prepareSubmissionError, appollorErrorToSubmission };
