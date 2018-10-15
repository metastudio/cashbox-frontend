import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { ActionType, getType } from 'typesafe-actions';

import {
  deleteOrganization,
  getOrganization,
  getOrganizations,
  postOrganization,
  putOrganization,
} from './api';

import {
  createOrganization,
  destroyOrganization,
  loadOrganization,
  loadOrganizations,
  restoreOrganization,
  setCurrentOrganization,
  updateOrganization,
} from './actions';

import { fetchCurrentOrganizationId, storeCurrentOrganizationId } from './storage-utils';

function* handleSetCurrentOrganization(
  { payload: { org }, meta: { resolve } }: ActionType<typeof setCurrentOrganization.request>,
) {
  yield call(storeCurrentOrganizationId, String(org.id));
  yield put(setCurrentOrganization.success(org));
  yield call(resolve, org);
}

function* handleRestoreOrganization() {
  try {
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
    const { organizations } = yield call(getOrganizations);
    yield put(loadOrganizations.success(organizations));
  } catch (error) {
    yield put(loadOrganizations.failure(error));
  }
}

function* handleLoadOrganization(
  { payload: { orgId } }: ActionType<typeof loadOrganization.request>,
) {
  try {
    const { organization } = yield call(getOrganization, orgId);
    yield put(loadOrganization.success(orgId, organization));
  } catch (error) {
    yield put(loadOrganization.failure(error));
  }
}

function* handleCreateOrganization(
  { payload: { data }, meta: { resolve, reject } }: ActionType<typeof createOrganization.request>,
) {
  try {
    const { organization } = yield call(postOrganization, data);
    yield put(createOrganization.success(organization));
    yield call(resolve, organization);
  } catch (error) {
    yield put(createOrganization.failure(error));
    yield call(reject, error);
  }
}

function* handleUpdateOrganization(
  { payload: { orgId, data }, meta: { resolve, reject } }: ActionType<typeof updateOrganization.request>,
) {
  try {
    const { organization } = yield call(putOrganization, orgId, data);
    yield put(updateOrganization.success(orgId, organization));
    yield call(resolve, organization);
  } catch (error) {
    yield put(updateOrganization.failure(error));
    yield call(reject, error);
  }
}

function* handleDestroyOrganization(
  { payload: { orgId }, meta: { resolve, reject } }: ActionType<typeof updateOrganization.request>,
) {
  try {
    yield put(destroyOrganization.request(orgId));
    const { organization } = yield call(deleteOrganization, orgId);
    yield put(destroyOrganization.success(orgId, organization));
    yield call(resolve, organization);
  } catch (error) {
    yield put(destroyOrganization.failure(error));
    yield call(reject, error);
  }
}

export default function* () {
  yield takeEvery(getType(setCurrentOrganization.request), handleSetCurrentOrganization);
  yield takeEvery(getType(restoreOrganization.request),    handleRestoreOrganization);

  yield takeLatest(getType(loadOrganizations.request),  handleLoadOrganizations);
  yield takeEvery(getType(createOrganization.request),  handleCreateOrganization);
  yield takeLatest(getType(loadOrganization.request),   handleLoadOrganization);
  yield takeEvery(getType(updateOrganization.request),  handleUpdateOrganization);
  yield takeEvery(getType(destroyOrganization.request), handleDestroyOrganization);
}
