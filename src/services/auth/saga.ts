import { call, put, takeEvery } from 'redux-saga/effects';
import { ActionType, getType } from 'typesafe-actions';

import { getCurrentUser } from 'services/users/api';

import {
  loginUser,
  logoutUser,
  restoreSession,
} from './actions';
import { postToken } from './api';

import { clearAuthToken, fetchAuthToken, storeAuthToken } from './storage-utils';

function* handleRestoreSession() {
  try {
    const token = yield call(fetchAuthToken);
    if (!token) { throw new Error('Token not found'); }

    const user = yield call(getCurrentUser);
    yield put(restoreSession.success(token, user));
  } catch (error) {
    yield put(restoreSession.failure(error));
  }
}

function* handleLoginUser(
  {
    payload: { email, password },
    meta: { resolve, reject },
  }: ActionType<typeof loginUser.request>,
) {
  try {
    const token = yield call(postToken, email || '', password);
    yield call(storeAuthToken, token);

    const user = yield call(getCurrentUser);
    yield put(loginUser.success(email || '', token, user));
    yield call(resolve, user);
  } catch (error) {
    yield put(loginUser.failure(error));
    yield call(reject, error);
  }
}

function* handleLogoutUser(
  { meta: { resolve } }: ActionType<typeof logoutUser.request>,
) {
  yield call(clearAuthToken);

  yield put(logoutUser.success());
  yield call(resolve);
}

export default function* () {
  yield takeEvery(getType(restoreSession.request), handleRestoreSession);
  yield takeEvery(getType(loginUser.request),      handleLoginUser);
  yield takeEvery(getType(logoutUser.request),     handleLogoutUser);
}
