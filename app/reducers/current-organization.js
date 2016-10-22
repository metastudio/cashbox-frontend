import { handleActions, combineActions } from 'redux-actions'

import {
  setCurrentOrganization,
  restoreSession,
} from 'actions'

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
