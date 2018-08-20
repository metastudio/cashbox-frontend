import { handleActions, combineActions } from 'redux-actions';

import * as statuses from 'constants/statuses.js';
import {
  loadInvoices,
  createInvoice,
  updateInvoice,
  destroyInvoice,
} from '../actions.js';

const defaultState = {
  items:      [],
  status:     statuses.INVALID,
  error:      null,
  pagination: null,
};

export default handleActions({
  [loadInvoices.request]: (state) => ({
    ...state,
    status: statuses.PENDING,
    error:  null,
  }),
  [loadInvoices.success]: (state, { payload }) => ({
    ...state,
    status:     statuses.SUCCESS,
    error:      null,
    items:      payload.invoices,
    pagination: payload.pagination,
  }),
  [combineActions(createInvoice.success, updateInvoice.success, destroyInvoice.success)]: (state) => ({
    ...state,
    status: statuses.INVALID,
  }),
  [loadInvoices.failure]: (state, { payload }) => ({
    ...state,
    status: statuses.FAILURE,
    error:  payload,
  }),
}, defaultState);
