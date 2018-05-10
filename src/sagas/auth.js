import { takeEvery, call, put } from 'redux-saga/effects';

import { getCookies, setCookies } from 'utils/cookies';
import { postToken } from 'api/token.js';
import { getCurrentUser } from 'api/users.js';
import { getOrganization } from 'api/organizations.js';
import { getCurrentMember } from 'api/members.js';

import {
  restoreSession,
  loginUser,
  logoutUser,
} from 'actions/auth.js';

import { clearCurrentOrganization } from 'actions/organizations.js';

function* handleRestoreSession({ meta: { resolve, reject } }) {
  try {
    yield put(restoreSession.request());
    const token = getCookies().token;
    if (!token) throw new Error('Token not found');
    const user = yield call(getCurrentUser);

    let organization;
    const currentOrganizationId = getCookies().currentOrganizationId;
    try {
      organization = currentOrganizationId && (yield call(getOrganization, currentOrganizationId));
    } catch (error) {
      organization = null;
    }

    let member;
    try {
      member = yield call(getCurrentMember, currentOrganizationId);
    } catch (error) {
      member = null;
    }

    yield put(restoreSession.success(token, user, organization, member));
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
