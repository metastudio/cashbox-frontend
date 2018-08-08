import { takeEvery, call, put, select } from 'redux-saga/effects';

import { getCookies, setCookies } from 'utils/cookies';

import { getOrganizations, getOrganization, postOrganization } from './api.js';
import { selectUserId } from 'services/users';

import {
  loadOrganizations,
  createOrganization,
  setCurrentOrganization,
  restoreOrganization,
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
    setCookies({ userId: userId, currentOrganizationId: organization.id });
  }
  yield put(setCurrentOrganization.success(organization));
  yield call(resolve, organization);
}

function* handleRestoreOrganization() {
  try {
    yield put(restoreOrganization.request());
    let organization;
    const currentOrganizationId = getCookies().currentOrganizationId;
    try {
      organization = currentOrganizationId && (yield call(getOrganization, currentOrganizationId));
    } catch (error) {
      organization = null;
    }

    yield put(restoreOrganization.success(organization));
  } catch (error) {
    yield put(restoreOrganization.failure(error));
  }
}

export default function* () {
  yield takeEvery(loadOrganizations,      handleLoadOrganizations);
  yield takeEvery(createOrganization,     handleCreateOrganization);
  yield takeEvery(setCurrentOrganization, handleSetCurrentOrganization);
  yield takeEvery(restoreOrganization,    handleRestoreOrganization);
}
