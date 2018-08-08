import { handleActions } from 'redux-actions';

import * as statuses from 'constants/statuses.js';
import { loadTransaction, clearTransaction } from './actions.js';

const defaultState = {
  id:     null,
  item:   null,
  status: statuses.INVALID,
  error:  null,
};

export default handleActions({
  [loadTransaction.request]: (state, { payload }) => ({
    ...state,
    id:     payload.id,
    status: statuses.PENDING,
    error:  null,
  }),
  [loadTransaction.success]: (state, { payload }) => ({
    ...state,
    status: statuses.SUCCESS,
    error:  null,
    item:   payload.transaction,
  }),
  [loadTransaction.failure]: (state, { payload }) => ({
    ...state,
    status: statuses.FAILURE,
    error:  payload,
  }),
  [clearTransaction]: (state) => ({
    ...state,
    data:   null,
    status: statuses.INVALID,
    error:  null,
  }),
}, defaultState);
