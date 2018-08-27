import { takeEvery, call, put, select } from 'redux-saga/effects';

import { getOrganizations, getOrganization, postOrganization } from './api.js';
import { selectUserId } from 'services/users';

import {
  loadOrganizations,
  createOrganization,
  setCurrentOrganization,
  restoreOrganization,
} from './actions.js';

import { fetchCurrentOrganizationId, storeCurrentOrganizationId } from './storage-utils';

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
  yield call(storeCurrentOrganizationId, organization.id);
  yield put(setCurrentOrganization.success(organization));
  yield call(resolve, organization);
}

function* handleRestoreOrganization() {
  try {
    yield put(restoreOrganization.request());
    const currentOrganizationId = yield call(fetchCurrentOrganizationId);

    let organization;
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
