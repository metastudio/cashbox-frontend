import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'

import { getCookies, setCookies, clearCookies } from 'utils/cookies'
import { postToken, getCurrentUser, getOrganization } from 'api'

import {
  restoreSession, restoreSessionRequest, restoreSessionSuccess, restoreSessionFailure,
  loginUser,      loginUserRequest,      loginUserSuccess,      loginUserFailure,
  logoutUser, logoutUserSuccess,
} from 'actions'

function* handleRestoreSession({ meta: { resolve, reject }}) {
  try {
    yield put(restoreSessionRequest())
    const token = getCookies().token
    if (!token) throw new Error('Token not found')
    const user = yield call(getCurrentUser)

    let organization
    const currentOrganizationId = getCookies().currentOrganizationId
    try {
      organization = currentOrganizationId && (yield call(getOrganization, currentOrganizationId))
    } catch (error) {
      organization = null
    }

    yield put(restoreSessionSuccess(token, user, organization))
    yield call(resolve, user)
  } catch (error) {
    yield put(restoreSessionFailure(error))
    yield call(reject, error)
  }
}

function* handleLoginUser({ payload: { email, password }, meta: { resolve, reject }}) {
  try {
    yield put(loginUserRequest(email))
    const token = yield call(postToken, email || '', password)
    setCookies({ token: token })
    const user = yield call(getCurrentUser)
    yield put(loginUserSuccess(email, token, user))
    yield call(resolve, user)
  } catch (error) {
    yield put(loginUserFailure(error))
    yield call(reject, { _error: (error.code == 401 ? 'Invalid login or password' : error.message) })
  }
}

function* handleLogoutUser({ meta: { resolve } }) {
  clearCookies()
  yield put(logoutUserSuccess())
  yield call(resolve)
}

export default function* () {
  yield takeEvery(restoreSession.toString(),      handleRestoreSession)
  yield takeEvery(loginUser.toString(),           handleLoginUser)
  yield takeEvery(logoutUser.toString(),          handleLogoutUser)
}
