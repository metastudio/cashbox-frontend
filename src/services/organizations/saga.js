import { takeEvery, call, put, select } from 'redux-saga/effects';

import { setCookies } from 'utils/cookies';

import { getOrganizations, postOrganization } from './api.js';
import { selectUserId } from 'services/users';

import {
  loadOrganizations,
  createOrganization,
  setCurrentOrganization,
} from './actions.js';

function* handleLoadOrganizations() {
  try {
    yield put(loadOrganizations.request());
    const organizations = yield call(getOrganizations);
    yield put(loadOrganizations.success(organizations));
  } catch (error) {
    yield put(loadOrganizations.failure(error));
  }
}

function* handleCreateOrganization({ payload: { data }, meta: { resolve, reject } }) {
  try {
    yield put(createOrganization.request());
    const organization = yield call(postOrganization, data);
    yield put(createOrganization.success(organization));
    yield call(resolve, organization);
  } catch (error) {
    yield put(createOrganization.failure(error));
    yield call(reject, error);
  }
}

function* handleSetCurrentOrganization({ payload: { organization }, meta: { resolve } }) {
  const userId = yield select(selectUserId);
  if (userId) {
    setCookies({ userId: userId });
    localStorage.setItem('currentOrganizationId', organization.id);
  }
  yield put(setCurrentOrganization.success(organization));
  yield call(resolve, organization);
}

export default function* () {
  yield takeEvery(loadOrganizations,      handleLoadOrganizations);
  yield takeEvery(createOrganization,     handleCreateOrganization);
  yield takeEvery(setCurrentOrganization, handleSetCurrentOrganization);
}


