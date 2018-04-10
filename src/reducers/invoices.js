import { handleActions, combineActions } from 'redux-actions';

import * as statuses from 'constants/statuses.js';
import {
  loadInvoices,
  createInvoice,
  loadInvoice
} from 'actions/invoices.js';

const defaultState = {
  items:       [],
  status:      statuses.INVALID,
  error:       null,
  pagination:  null,
  unpaidCount: null,
};

export default handleActions({
  [loadInvoices.request]: (state) => ({
    ...state,
    status: statuses.PENDING,
    error:  null,
  }),
  [loadInvoices.success]: (state, { payload }) => ({
    ...state,
    status:      statuses.SUCCESS,
    error:       null,
    items:       payload.invoices,
    pagination:  payload.pagination,
    unpaidCount: payload.unpaidСount,
  }),
  [combineActions(createInvoice.success, loadInvoice.success)]: (state, { payload }) => ({
    ...state,
    status: statuses.INVALID,
  }),
  [loadInvoices.failure]: (state, { payload }) => ({
    ...state,
    status: statuses.FAILURE,
    error:  payload
  }),
}, defaultState);

