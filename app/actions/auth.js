import { createAction } from 'redux-actions'
import { noop } from 'lodash'

export const loginUser        = createAction('LOGIN_USER',         (email, password) => ({ email, password }), (_email, _password, resolve = noop, reject = noop) => ({ resolve, reject}))
export const loginUserRequest = createAction('LOGIN_USER_REQUEST', (email) => ({ email }))
export const loginUserSuccess = createAction('LOGIN_USER_SUCCESS', (email, token, user) => ({ email, token, user }))
export const loginUserFailure = createAction('LOGIN_USER_FAILURE')

export const restoreSession        = createAction('RESTORE_SESSION', undefined, (resolve = noop, reject = noop) => ({ resolve, reject }))
export const restoreSessionRequest = createAction('RESTORE_SESSION_REQUEST')
export const restoreSessionSuccess = createAction('RESTORE_SESSION_SUCCESS', (token, user, organization) => ({ token, user, organization }))
export const restoreSessionFailure = createAction('RESTORE_SESSION_FAILURE')

export const logoutUser        = createAction('LOGOUT_USER', undefined, (resolve = noop, reject = noop) => ({ resolve, reject }))
export const logoutUserSuccess = createAction('LOGOUT_USER_SUCCESS')
