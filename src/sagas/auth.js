import { takeEvery, call, put } from 'redux-saga/effects';

import { getCookies, setCookies, clearCookies } from 'utils/cookies';
import { postToken } from 'api/token.js';
import { getCurrentUser } from 'api/users.js';
import { getOrganization } from 'api/organizations.js';

import {
  restoreSession,
  loginUser,
  logoutUser,
} from 'actions/auth.js';

function* handleRestoreSession({ meta: { resolve, reject } }) {
  try {
    yield put(restoreSession.request());
    const token = getCookies().token;
    if (!token) throw new Error('Token not found');
    const user = yield call(getCurrentUser);

    let organization;
    const currentOrganizationId = getCookies().currentOrganizationId;
    console.log("!!!!!!!", currentOrganizationId);
    try {
      organization = currentOrganizationId && (yield call(getOrganization, currentOrganizationId));
    } catch (error) {
      organization = null;
    }

    yield put(restoreSession.success(token, user, organization));
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
    yield put(loginUser.success(email, token, user));
    yield call(resolve, user);
  } catch (error) {
    yield put(loginUser.failure(error));
    yield call(reject, error);
  }
}

function* handleLogoutUser({ meta: { resolve } }) {
  clearCookies();
  yield put(logoutUser.success());
  yield call(resolve);
}

export default function* () {
  yield takeEvery(restoreSession.toString(), handleRestoreSession);
  yield takeEvery(loginUser.toString(),      handleLoginUser);
  yield takeEvery(logoutUser.toString(),     handleLogoutUser);
}
