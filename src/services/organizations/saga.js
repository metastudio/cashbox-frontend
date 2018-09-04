import { takeEvery, takeLatest, call, put, select } from 'redux-saga/effects';

import {
  getOrganizations,
  getOrganization,
  postOrganization,
  putOrganization,
  deleteOrganization,
} from './api.js';

import {
  setCurrentOrganization,
  restoreOrganization,
  loadOrganizations,
  loadOrganization,
  createOrganization,
  updateOrganization,
  destroyOrganization,
} from './actions.js';

import { fetchCurrentOrganizationId, storeCurrentOrganizationId } from './storage-utils';

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
      const response = currentOrganizationId && (yield call(getOrganization, currentOrganizationId));
      organization = response.organization;
    } catch (error) {
      organization = null;
    }

    yield put(restoreOrganization.success(organization));
  } catch (error) {
    yield put(restoreOrganization.failure(error));
  }
}

function* handleLoadOrganizations() {
  try {
    yield put(loadOrganizations.request());
    const { organizations } = yield call(getOrganizations);
    yield put(loadOrganizations.success(organizations));
  } catch (error) {
    yield put(loadOrganizations.failure(error));
  }
}

function* handleLoadOrganization({ payload: { organizationId } }) {
  try {
    yield put(loadOrganization.request(organizationId));
    const { organization } = yield call(getOrganization, organizationId);
    yield put(loadOrganization.success(organizationId, organization));
  } catch (error) {
    yield put(loadOrganization.failure(error));
  }
}

function* handleCreateOrganization({ payload: { data }, meta: { resolve, reject } }) {
  try {
    yield put(createOrganization.request());
    const { organization } = yield call(postOrganization, data);
    yield put(createOrganization.success(organization));
    yield call(resolve, organization);
  } catch (error) {
    yield put(createOrganization.failure(error));
    yield call(reject, error);
  }
}

function* handleUpdateOrganization({ payload: { organizationId, data }, meta: { resolve, reject } }) {
  try {
    yield put(updateOrganization.request(organizationId));
    const { organization } = yield call(putOrganization, organizationId, data);
    yield put(updateOrganization.success(organizationId, organization));
    yield call(resolve, organization);
  } catch (error) {
    yield put(updateOrganization.failure(error));
    yield call(reject, error);
  }
}

function* handleDestroyOrganization({ payload: { organizationId }, meta: { resolve, reject } }) {
  try {
    yield put(destroyOrganization.request(organizationId));
    const { organization } = yield call(deleteOrganization, organizationId);
    yield put(destroyOrganization.success(organizationId, organization));
    yield call(resolve, organization);
  } catch (error) {
    yield put(destroyOrganization.failure(error));
    yield call(reject, error);
  }
}

export default function* () {
  yield takeEvery(setCurrentOrganization, handleSetCurrentOrganization);
  yield takeEvery(restoreOrganization,    handleRestoreOrganization);

  yield takeLatest(loadOrganizations,  handleLoadOrganizations);
  yield takeEvery(createOrganization,  handleCreateOrganization);
  yield takeLatest(loadOrganization,   handleLoadOrganization);
  yield takeEvery(updateOrganization,  handleUpdateOrganization);
  yield takeEvery(destroyOrganization, handleDestroyOrganization);
}
