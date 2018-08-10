import { handleActions } from 'redux-actions';

import * as statuses from 'constants/statuses.js';

import { loadOrganizations } from './actions.js';

const defaultState = {
  items:  [],
  status: statuses.INVALID,
  error:  null,
};

export default handleActions({
  [loadOrganizations.request]: (state) => ({
    ...state,
    items:  [],
    status: statuses.PENDING,
    error:  null,
  }),
  [loadOrganizations.success]: (state, { payload }) => ({
    ...state,
    items:  payload.organizations,
    status: statuses.SUCCESS,
    error:  null,
  }),
  [loadOrganizations.failure]: (state, { payload }) => ({
    ...state,
    items:  [],
    status: statuses.FAILURE,
    error:  payload,
  }),
}, defaultState);
