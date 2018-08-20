import { handleActions } from 'redux-actions';

import * as statuses from 'constants/statuses.js';
import { loadDebtors } from '../actions.js';

const defaultState = {
  items:  [],
  total: 0,
  totalsByCurrency: [],
  status: statuses.INVALID,
  error:  null,
};

export default handleActions({
  [loadDebtors.request]: (state) => ({
    ...state,
    items:  [],
    total: 0,
    totalsByCurrency: [],
    status: statuses.PENDING,
    error:  null,
  }),
  [loadDebtors.success]: (state, { payload }) => ({
    ...state,
    items:  payload.debtors,
    total: payload.total,
    totalsByCurrency: payload.totalsByCurrency,
    status: statuses.SUCCESS,
    error:  null,
  }),
  [loadDebtors.failure]: (state, { payload }) => ({
    ...state,
    items:  [],
    total: 0,
    totalsByCurrency: [],
    status: statuses.FAILURE,
    error:  payload,
  }),
}, defaultState);
