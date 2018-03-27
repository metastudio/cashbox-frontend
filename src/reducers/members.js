import { handleActions } from 'redux-actions'

import * as statuses from 'constants/statuses.js'
import { loadMembers } from 'actions/members.js'

const defaultState = {
  items:  [],
  status: statuses.INVALID,
  error:  null,
}

export default handleActions({
  [loadMembers.request]: (state) => ({
    ...state,
    items:  [],
    status: statuses.PENDING,
    error:  null,
  }),
  [loadMembers.success]: (state, { payload }) => ({
    ...state,
    items:  payload.members,
    status: statuses.SUCCESS,
    error:  null,
  }),
  [loadMembers.failure]: (state, { payload }) => ({
    ...state,
    items:  [],
    status: statuses.FAILURE,
    error:  payload
  }),
}, defaultState)
