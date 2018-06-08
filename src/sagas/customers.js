import { takeEvery, takeLatest, call, put } from 'redux-saga/effects';

import {
  getOrganizationCustomers,
  getOrganizationCustomer,
  postOrganizationCustomer,
  putOrganizationCustomer,
  deleteOrganizationCustomer,
} from 'api/customers.js';

import {
  loadCustomers,
  loadCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from 'actions/customers.js';

function* handleLoadCustomers({ payload: { organizationId }, meta: { resolve, reject } }) {
  try {
    yield put(loadCustomers.request(organizationId));
    const customers = yield call(getOrganizationCustomers, organizationId);
    yield put(loadCustomers.success(organizationId, customers));
    yield call(resolve, customers);
  } catch (error) {
    yield put(loadCustomers.failure(error));
    yield call(reject, error);
  }
}

function* handleLoadCustomer({ payload: { organizationId, customerId } }) {
  try {
    yield put(loadCustomer.request(organizationId, customerId));
    const customer = yield call(getOrganizationCustomer, organizationId, customerId);
    yield put(loadCustomer.success(organizationId, customer));
  } catch (error) {
    yield put(loadCustomer.failure(error));
  }
}

function* handleCreateCustomer({ payload: { organizationId, data }, meta: { resolve, reject } }) {
  try {
    yield put(createCustomer.request(organizationId));
    const customer = yield call(postOrganizationCustomer, organizationId, data);
    yield put(createCustomer.success(organizationId, customer));
    yield call(resolve, customer);
  } catch (error) {
    yield put(createCustomer.failure(error));
    yield call(reject, error);
  }
}

function* handleUpdateCustomer({ payload: { organizationId, customerId, data }, meta: { resolve, reject } }) {
  try {
    yield put(updateCustomer.request(organizationId, customerId));
    const customer = yield call(putOrganizationCustomer, organizationId, customerId, data);
    yield put(updateCustomer.success(organizationId, customerId, customer));
    yield call(resolve, customer);
  } catch (error) {
    yield put(updateCustomer.failure(error));
    yield call(reject, error);
  }
}

function* handleDeleteCustomer({ payload: { organizationId, customerId }, meta: { resolve, reject } }) {
  try {
    yield put(deleteCustomer.request(organizationId, customerId));
    const customer = yield call(deleteOrganizationCustomer, organizationId, customerId);
    yield put(deleteCustomer.success(organizationId, customer));
    yield call(resolve, customer);
  } catch (error) {
    yield put(deleteCustomer.failure(error));
    yield call(reject, error);
  }
}

export default function* () {
  yield takeLatest(loadCustomers, handleLoadCustomers);
  yield takeLatest(loadCustomer, handleLoadCustomer);
  yield takeEvery(createCustomer, handleCreateCustomer);
  yield takeEvery(updateCustomer, handleUpdateCustomer);
  yield takeEvery(deleteCustomer, handleDeleteCustomer);
}
