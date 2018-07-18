import { takeEvery, call, put } from 'redux-saga/effects';

import { getCookies, setCookies } from 'utils/cookies';
import { postToken } from './api.js';
import { getCurrentUser } from 'services/users/api.js';
import { getOrganization } from 'services/organizations/api.js';

import {
  restoreSession,
  loginUser,
  logoutUser,
} from './actions.js';

import { clearCurrentOrganization } from 'services/organizations';

function* handleRestoreSession({ meta: { resolve, reject } }) {
  try {
    yield put(restoreSession.request());
    const token = getCookies().token;
    if (!token) throw new Error('Token not found');
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
    setCookies({ token: token });
    const user = yield call(getCurrentUser);
    if (user.id !== getCookies().userId) {
      setCookies({ currentOrganizationId: undefined });
      yield put(clearCurrentOrganization());
    }
    yield put(loginUser.success(email, token, user));
    yield call(resolve, user);
  } catch (error) {
    yield put(loginUser.failure(error));
    yield call(reject, error);
  }
}

function* handleLogoutUser({ meta: { resolve } }) {
  setCookies({ token: undefined });
  yield put(logoutUser.success());
  yield call(resolve);
}

export default function* () {
  yield takeEvery(restoreSession, handleRestoreSession);
  yield takeEvery(loginUser,      handleLoginUser);
  yield takeEvery(logoutUser,     handleLogoutUser);
}
