import { handleActions } from 'redux-actions';

import * as statuses from 'constants/statuses.js';
import { loadCurrencies } from './actions.js';

const defaultState = {
  items:  null,
  status: statuses.INVALID,
  error:  null,
};

export default handleActions({
  [loadCurrencies.request]: (state) => ({
    ...state,
    items:  null,
    status: statuses.PENDING,
    error:  null,
  }),
  [loadCurrencies.success]: (state, { payload }) => ({
    ...state,
    items:  payload.currencies,
    status: statuses.SUCCESS,
    error:  null,
  }),
  [loadCurrencies.failure]: (state, { payload }) => ({
    ...state,
    status: statuses.FAILURE,
    error:  payload,
  }),
}, defaultState);
