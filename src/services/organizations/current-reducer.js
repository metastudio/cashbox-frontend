import { handleActions, combineActions } from 'redux-actions';

import { setCurrentOrganization, clearCurrentOrganization } from './actions.js';
import { restoreSession, loginUser } from 'services/auth';

const defaultState = {
  id:   null,
  data: null,
};

export default handleActions({
  [combineActions(setCurrentOrganization.success, restoreSession.success, loginUser.success)]: (state, { payload }) => ({
    ...state,
    id:   payload.organization && payload.organization.id,
    data: payload.organization,
  }),
  [clearCurrentOrganization]: (state) => ({
    ...state,
    id:   null,
    data: null,
  }),
}, defaultState);
