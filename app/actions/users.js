import { createAction } from 'redux-actions'
import { noop } from 'lodash'

export const updateProfile = createAction('UPDATE_PROFILE', (userId, data) => ({ userId, data }), (_userId, _data, resolve = noop, reject = noop) => ({ resolve, reject }))
updateProfile.request = createAction('UPDATE_PROFILE_REQUEST', (userId) => ({ userId }))
updateProfile.success = createAction('UPDATE_PROFILE_SUCCESS', (user) => ({ user }))
updateProfile.failure = createAction('UPDATE_PROFILE_FAILURE')

export const updateAccount = createAction('UPDATE_ACCOUNT', (userId, data) => ({ userId, data }), (_userId, _data, resolve = noop, reject = noop) => ({ resolve, reject }))
updateAccount.request = createAction('UPDATE_ACCOUNT_REQUEST', (userId) => ({ userId }))
updateAccount.success = createAction('UPDATE_ACCOUNT_SUCCESS', (user) => ({ user }))
updateAccount.failure = createAction('UPDATE_ACCOUNT_FAILURE')

export const cancelAccount = createAction('CANCEL_ACCOUNT', (userId) => ({ userId }),
(_userId, resolve = noop, reject = noop) => ({ resolve, reject }))
cancelAccount.request = createAction('CANCEL_ACCOUNT_REQUEST', (userId) => ({ userId }))
cancelAccount.success = createAction('CANCEL_ACCOUNT_SUCCESS')
cancelAccount.failure = createAction('CANCEL_ACCOUNT_FAILURE')