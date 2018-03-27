import { takeEvery, call, put } from 'redux-saga/effects'
import { stopSubmit } from 'redux-form'

import {
  updateProfile as updateProfileApi,
  updateAccount as updateAccountApi,
  cancelAccount as cancelAccountApi
} from 'api/index.js'

import {
  updateProfile,
  updateAccount,
  cancelAccount
} from 'actions/users.js'

export function* handleUpdateProfile({ payload: { userId, data }, meta: { resolve, reject } }) {
  try {
    const user = yield call(updateProfileApi, userId, data)
    yield put(updateProfile.success(user))
    yield call(resolve, user)
  } catch (error) {
    yield call(reject, error.errors)
  }
}

export function* handleUpdateAccount({ payload: { userId, data }, meta: { resolve, reject }}) {
  try {
    const user = yield call(updateAccountApi, userId, data)
    yield put(updateAccount.success(user))
    yield call(resolve, user)
  } catch (error) {
    yield call(reject, error.errors)
  }
}

export function* handleCancelAccount({ payload: { userId }, meta: { resolve, reject }}) {
  try {
    yield call(cancelAccountApi, userId)
    yield put(updateAccount.success)
    yield call(resolve)
  } catch (error) {
    yield call(reject, error)
  }
}

export default function* () {
  yield takeEvery(updateProfile.toString(), handleUpdateProfile)
  yield takeEvery(updateAccount.toString(), handleUpdateAccount)
  yield takeEvery(cancelAccount.toString(), handleCancelAccount)
}
