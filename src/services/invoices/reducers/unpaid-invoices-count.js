import { handleActions, combineActions } from 'redux-actions';

import * as statuses from 'constants/statuses.js';
import {
  loadUnpaidInvoicesCount,
  createInvoice,
  updateInvoice,
  destroyInvoice,
} from '../actions.js';
import { setCurrentOrganization } from 'services/organizations/actions';

const defaultState = {
  count:  null,
  status: statuses.INVALID,
  error:  null,
};

export default handleActions({
  [loadUnpaidInvoicesCount.request]: (state) => ({
    ...state,
    status: statuses.PENDING,
    error:  null,
  }),
  [loadUnpaidInvoicesCount.success]: (state, { payload }) => ({
    ...state,
    status: statuses.SUCCESS,
    count:  payload.unpaidCount,
  }),
  [combineActions(createInvoice.success, updateInvoice.success, destroyInvoice.success)]: (state) => ({
    ...state,
    status: statuses.INVALID,
  }),
  [loadUnpaidInvoicesCount.failure]: (state, { payload }) => ({
    ...state,
    status: statuses.FAILURE,
    error:  payload,
  }),
  [setCurrentOrganization.success]: (state) => ({
    ...state,
    ...defaultState,
  }),
}, defaultState);
