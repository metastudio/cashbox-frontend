import { takeEvery, call, put } from 'redux-saga/effects';

import { postToken } from './api.js';
import { getCurrentUser } from 'services/users/api.js';
import { getOrganization } from 'services/organizations/api';

import {
  restoreSession,
  loginUser,
  logoutUser,
} from './actions.js';

import { fetchAuthToken, storeAuthToken, clearAuthToken } from './storage-utils';

function* handleRestoreSession({ meta: { resolve, reject } }) {
  try {
    yield put(restoreSession.request());

    const token = yield call(fetchAuthToken);
    if (!token) { throw new Error('Token not found'); }

    const user = yield call(getCurrentUser);
    yield put(restoreSession.success(token, user));
    yield call(resolve, user);
  } catch (error) {
    yield put(restoreSession.failure(error));
    yield call(reject, error);
  }
}

function* handleLoginUser({ payload: { email, password }, meta: { resolve, reject } }) {
  try {
    yield put(loginUser.request(email));

    const token = yield call(postToken, email || '', password);
    yield call(storeAuthToken, token);

    const user = yield call(getCurrentUser);
    yield put(loginUser.success(email, token, user));
    yield call(resolve, user);
  } catch (error) {
    yield put(loginUser.failure(error));
    yield call(reject, error);
  }
}

function* handleLogoutUser({ meta: { resolve } }) {
  yield call(clearAuthToken);

  yield put(logoutUser.success());
  yield call(resolve);
}

export default function* () {
  yield takeEvery(restoreSession, handleRestoreSession);
  yield takeEvery(loginUser,      handleLoginUser);
  yield takeEvery(logoutUser,     handleLogoutUser);
}
