import { createAction } from 'redux-actions'
import { noop } from 'lodash'

export const updateProfile = createAction('UPDATE_PROFILE', (userId, data) => ({ userId, data }), (_userId, _data, resolve = noop, reject = noop) => ({ resolve, reject }))
updateProfile.success = createAction('UPDATE_PROFILE_SUCCESS', (user) => ({ user }))

export const updateAccount = createAction('UPDATE_ACCOUNT', (userId, data) => ({ userId, data }), (_userId, _data, resolve = noop, reject = noop) => ({ resolve, reject }))
updateAccount.success = createAction('UPDATE_ACCOUNT_SUCCESS', (user) => ({ user }))

export const cancelAccount = createAction('CANCEL_ACCOUNT', (userId) => ({ userId }),
(_userId, resolve = noop, reject = noop) => ({ resolve, reject }))
cancelAccount.success = createAction('CANCEL_ACCOUNT_SUCCESS')
