import { createAction } from 'typesafe-actions';

import { ID } from 'model-types';
import { ITransactionsSummary } from './types';

const loadTransactionsSummary = {
  request: createAction(
    'LOAD_TRANSACTIONS_SUMMARY_REQUEST',
    (resolve) => {
      return (orgId: ID, query: {}) => resolve({ orgId, query });
    },
  ),
  success: createAction(
    'LOAD_TRANSACTIONS_SUMMARY_SUCCESS',
    (resolve) => {
      return (orgId: ID, summary: ITransactionsSummary) => resolve({ orgId, summary });
    },
  ),
  failure: createAction(
    'LOAD_TRANSACTIONS_SUMMARY_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

export {
  loadTransactionsSummary,
};
