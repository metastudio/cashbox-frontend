import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { ActionType, getType } from 'typesafe-actions';

import {
  createCustomer,
  deleteCustomer,
  loadCustomer,
  loadCustomers,
  updateCustomer,
} from './actions';
import {
  deleteOrganizationCustomer,
  getOrganizationCustomer,
  getOrganizationCustomers,
  postOrganizationCustomer,
  putOrganizationCustomer,
} from './api';

function* handleLoadCustomers(
  { payload: { orgId } }: ActionType<typeof loadCustomers.request>,
) {
  try {
    const customers = yield call(getOrganizationCustomers, orgId);
    yield put(loadCustomers.success(orgId, customers));
  } catch (error) {
    yield put(loadCustomers.failure(error));
  }
}

function* handleLoadCustomer(
  { payload: { orgId, customerId } }: ActionType<typeof loadCustomer.request>,
) {
  try {
    const customer = yield call(getOrganizationCustomer, orgId, customerId);
    yield put(loadCustomer.success(orgId, customer));
  } catch (error) {
    yield put(loadCustomer.failure(error));
  }
}

function* handleCreateCustomer(
  {
    payload: { orgId, data },
    meta:    { resolve, reject },
  }: ActionType<typeof createCustomer.request>,
) {
  try {
    const customer = yield call(postOrganizationCustomer, orgId, data);
    yield put(createCustomer.success(orgId, customer));
    yield call(resolve, customer);
  } catch (error) {
    yield put(createCustomer.failure(error));
    yield call(reject, error);
  }
}

function* handleUpdateCustomer(
  {
    payload: { orgId, customerId, data },
    meta:    { resolve, reject },
  }: ActionType<typeof updateCustomer.request>,
) {
  try {
    const customer = yield call(putOrganizationCustomer, orgId, customerId, data);
    yield put(updateCustomer.success(orgId, customer));
    yield call(resolve, customer);
  } catch (error) {
    yield put(updateCustomer.failure(error));
    yield call(reject, error);
  }
}

function* handleDeleteCustomer(
  {
    payload: { orgId, customerId },
    meta:    { resolve, reject },
  }: ActionType<typeof deleteCustomer.request>,
) {
  try {
    const customer = yield call(deleteOrganizationCustomer, orgId, customerId);
    yield put(deleteCustomer.success(orgId, customer));
    yield call(resolve, customer);
  } catch (error) {
    yield put(deleteCustomer.failure(error));
    yield call(reject, error);
  }
}

export default function* () {
  yield takeLatest(getType(loadCustomers.request), handleLoadCustomers);
  yield takeLatest(getType(loadCustomer.request), handleLoadCustomer);
  yield takeEvery(getType(createCustomer.request), handleCreateCustomer);
  yield takeEvery(getType(updateCustomer.request), handleUpdateCustomer);
  yield takeEvery(getType(deleteCustomer.request), handleDeleteCustomer);
}
