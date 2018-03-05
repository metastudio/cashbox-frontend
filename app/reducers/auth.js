import { handleActions, combineActions } from 'redux-actions'

import {
  restoreSession,
  loginUser,
  logoutUser,
  updateProfile,
  updateAccount,
  cancelAccount
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
  [combineActions(logoutUser.success, cancelAccount.success)]: (state) => ({
    ...state,
    token:  null,
    user:   null,
  }),
  [combineActions(updateProfile.request, updateAccount.request, cancelAccount.request)]: (state) => ({
    ...state,
    token: state.token,
    user:  state.user
  }),
  [combineActions(updateProfile.success, updateAccount.success)]: (state, { payload }) => ({
    ...state,
    token: state.token,
    user:  payload.user
  }),
  [combineActions(updateProfile.failure, updateAccount.failure, cancelAccount.failure)]: (state) => ({
    ...state,
    token: state.token,
    user:  state.user
  })
}, defaultState)
