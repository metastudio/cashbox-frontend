import { handleActions } from 'redux-actions';

import * as statuses from 'constants/statuses.js';
import { loadInvoice } from '../actions.js';
import { setCurrentOrganization } from 'services/organizations/actions.js';

const defaultState = {
  id:          null,
  item:        null,
  status:      statuses.INVALID,
  error:       null,
};

export default handleActions({
  [loadInvoice.request]: (state, { payload }) => ({
    ...state,
    id:     payload.invoiceId,
    status: statuses.PENDING,
    error:  null,
  }),
  [loadInvoice.success]: (state, { payload }) => ({
    ...state,
    status:      statuses.SUCCESS,
    error:       null,
    item:        payload.invoice,
  }),
  [loadInvoice.failure]: (state, { payload }) => ({
    ...state,
    status: statuses.FAILURE,
    error:  payload,
  }),
  [setCurrentOrganization.success]: (state) => ({
    ...state,
    ...defaultState,
  }),
}, defaultState);
