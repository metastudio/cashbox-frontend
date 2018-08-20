import { handleActions } from 'redux-actions';

import * as statuses from 'constants/statuses.js';
import { loadCustomer } from '../actions.js';

const defaultState = {
  data:   null,
  status: statuses.INVALID,
  error:  null,
};

export default handleActions({
  [loadCustomer.request]: (state) => ({
    ...state,
    data:   null,
    status: statuses.PENDING,
    error:  null,
  }),
  [loadCustomer.success]: (state, { payload }) => ({
    ...state,
    data:   payload.customer,
    status: statuses.SUCCESS,
    error:  null,
  }),
  [loadCustomer.failure]: (state, { payload }) => ({
    ...state,
    data:   null,
    status: statuses.FAILURE,
    error:  payload,
  }),
}, defaultState);
