import { handleActions, combineActions } from 'redux-actions'

import {
  restoreSession,
  loginUser,
  logoutUser,
} from 'actions'

const defaultState = {
  token: null,
  user:  null,
}

export default handleActions({
  [combineActions(restoreSession.request, loginUser.request)]: (state) => ({
    ...state,
    token: null,
    user: null,
  }),
  [combineActions(restoreSession.success, loginUser.success)]: (state, { payload }) => ({
    ...state,
    token: payload.token,
    user:  payload.user,
  }),
  [combineActions(restoreSession.failure, loginUser.failure)]: (state) => ({
    ...state,
    token:  null,
    user:   null,
  }),
  [logoutUser.success]: (state) => ({
    ...state,
    token:  null,
    user:   null,
  }),
}, defaultState)
