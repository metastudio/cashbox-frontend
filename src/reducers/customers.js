import { handleActions } from 'redux-actions';

import * as statuses from 'constants/statuses.js';
import {
  loadCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from 'actions/customers.js';

const defaultState = {
  items:  [],
  status: statuses.INVALID,
  error:  null,
};

export default handleActions({
  [loadCustomers.request]: (state) => ({
    ...state,
    items:  [],
    status: statuses.PENDING,
    error:  null,
  }),
  [loadCustomers.success]: (state, { payload }) => ({
    ...state,
    items:  payload.customers,
    status: statuses.SUCCESS,
    error:  null,
  }),
  [loadCustomers.failure]: (state, { payload }) => ({
    ...state,
    items:  [],
    status: statuses.FAILURE,
    error:  payload
  }),
  [createCustomer.success]: (state) => ({
    ...state,
    status: statuses.INVALID,
  }),
  [updateCustomer.success]: (state, { payload }) => ({
    ...state,
    items:  state.items.map(c => c.id === payload.customer.id ? payload.customer : c),
  }),
  [deleteCustomer.success]: (state, { payload }) => ({
    ...state,
    items:  state.items.filter(c => c.id !== payload.customer.id),
  }),
}, defaultState);
