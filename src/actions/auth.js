import { createAction } from 'redux-actions'
import { noop } from 'lodash'

export const loginUser = createAction('LOGIN_USER',         (email, password) => ({ email, password }), (_email, _password, resolve = noop, reject = noop) => ({ resolve, reject}))
loginUser.request = createAction('LOGIN_USER_REQUEST', (email) => ({ email }))
loginUser.success = createAction('LOGIN_USER_SUCCESS', (email, token, user) => ({ email, token, user }))
loginUser.failure = createAction('LOGIN_USER_FAILURE')

export const restoreSession  = createAction('RESTORE_SESSION', undefined, (resolve = noop, reject = noop) => ({ resolve, reject }))
restoreSession.request = createAction('RESTORE_SESSION_REQUEST')
restoreSession.success = createAction('RESTORE_SESSION_SUCCESS', (token, user, organization) => ({ token, user, organization }))
restoreSession.failure = createAction('RESTORE_SESSION_FAILURE')

export const logoutUser = createAction('LOGOUT_USER', undefined, (resolve = noop, reject = noop) => ({ resolve, reject }))
logoutUser.success = createAction('LOGOUT_USER_SUCCESS')
