import { handleActions, combineActions } from 'redux-actions';

import { setCurrentOrganization, clearCurrentOrganization } from 'actions/organizations.js';
import { restoreSession } from 'actions/auth.js';

const defaultState = {
  id:   null,
  data: null,
};

export default handleActions({
  [combineActions(setCurrentOrganization.success, restoreSession.success)]: (state, { payload }) => ({
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
