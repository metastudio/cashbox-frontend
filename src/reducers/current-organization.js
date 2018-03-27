import { handleActions, combineActions } from 'redux-actions'

import { setCurrentOrganization } from 'actions/organizations.js';
import { restoreSession } from 'actions/auth.js';

const defaultState = {
  id:   null,
  data: null,
}

export default handleActions({
  [combineActions(setCurrentOrganization.success, restoreSession.success)]: (state, { payload }) => ({
    ...state,
    id:   payload.organization && payload.organization.id,
    data: payload.organization,
  }),
}, defaultState)
