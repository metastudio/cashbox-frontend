import { handleActions, combineActions } from 'redux-actions'

import {
  restoreSessionRequest, restoreSessionSuccess, restoreSessionFailure,
  loginUserRequest,      loginUserSuccess,      loginUserFailure,
  logoutUserSuccess,
} from 'actions'

const defaultState = {
  token: null,
  user:  null,
}

export default handleActions({
  [combineActions(restoreSessionRequest, loginUserRequest)]: (state) => ({
    ...state,
    token: null,
    user: null,
  }),
  [combineActions(restoreSessionSuccess, loginUserSuccess)]: (state, { payload }) => ({
    ...state,
    token: payload.token,
    user:  payload.user,
  }),
  [combineActions(restoreSessionFailure, loginUserFailure)]: (state) => ({
    ...state,
    token:  null,
    user:   null,
  }),
  [logoutUserSuccess]: (state) => ({
    ...state,
    token:  null,
    user:   null,
  }),
}, defaultState)
