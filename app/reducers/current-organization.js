import { handleActions, combineActions } from 'redux-actions'

import {
  setCurrentOrganizationSuccess,
  restoreSessionSuccess
} from 'actions'

const defaultState = {
  id:   null,
  data: null,
}

export default handleActions({
  [combineActions(setCurrentOrganizationSuccess, restoreSessionSuccess)]: (state, { payload }) => ({
    ...state,
    id:   payload.organization && payload.organization.id,
    data: payload.organization,
  }),
}, defaultState)
