import { handleActions } from 'redux-actions';

import * as statuses from 'constants/statuses.js';
import { loadOrganization } from '../actions.js';

const defaultState = {
  data:   null,
  status: statuses.INVALID,
  error:  null,
};

export default handleActions({
  [loadOrganization.request]: (state) => ({
    ...state,
    data:   null,
    status: statuses.PENDING,
    error:  null,
  }),
  [loadOrganization.success]: (state, { payload }) => ({
    ...state,
    data:   payload.organization,
    status: statuses.SUCCESS,
    error:  null,
  }),
  [loadOrganization.failure]: (state, { payload }) => ({
    ...state,
    status: statuses.FAILURE,
    error:  payload,
  }),
}, defaultState);
