import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'

import { ValidationError } from 'api/errors'
import {
  getOrganizationCustomers,
  getOrganizationCustomer,
  postOrganizationCustomer,
  putOrganizationCustomer,
  deleteOrganizationCustomer,
} from 'api'

import {
  loadCustomers,
  loadCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from 'actions'

function* handleLoadCustomers({ payload: { organizationId }}) {
  try {
    yield put(loadCustomers.request(organizationId))
    const customers = yield call(getOrganizationCustomers, organizationId)
    yield put(loadCustomers.success(organizationId, customers))
  } catch (error) {
    yield put(loadCustomers.failure(error))
  }
}

function* handleLoadCustomer({ payload: { organizationId, customerId }}) {
  try {
    yield put(loadCustomer.request(organizationId, customerId))
    const customer = yield call(getOrganizationCustomer, organizationId, customerId)
    yield put(loadCustomer.success(organizationId, customer))
  } catch (error) {
    yield put(loadCustomer.failure(error))
  }
}

function* handleCreateCustomer({ payload: { organizationId, data }, meta: { resolve, reject } }) {
  try {
    yield put(createCustomer.request(organizationId))
    const customer = yield call(postOrganizationCustomer, organizationId, data)
    yield put(createCustomer.success(organizationId, customer))
    yield call(resolve, customer)
  } catch (error) {
    yield put(createCustomer.failure(error))
    const errors = error instanceof ValidationError ? error.errors : { _error: error.message }
    yield call(reject, errors)
  }
}

function* handleUpdateCustomer({ payload: { organizationId, customerId, data }, meta: { resolve, reject } }) {
  try {
    yield put(updateCustomer.request(organizationId, customerId))
    const customer = yield call(putOrganizationCustomer, organizationId, customerId, data)
    yield put(updateCustomer.success(organizationId, customerId, customer))
    yield call(resolve, customer)
  } catch (error) {
    yield put(updateCustomer.failure(error))
    const errors = error instanceof ValidationError ? error.errors : { _error: error.message }
    yield call(reject, errors)
  }
}

function* handleDeleteCustomer({ payload: { organizationId, customerId }}) {
  try {
    yield put(deleteCustomer.request(organizationId, customerId))
    const customer = yield call(deleteOrganizationCustomer, organizationId, customerId)
    yield put(deleteCustomer.success(organizationId, customer))
  } catch (error) {
    yield put(deleteCustomer.failure(error))
  }
}

export default function* () {
  yield takeEvery(loadCustomers.toString(), handleLoadCustomers)
  yield takeEvery(loadCustomer.toString(), handleLoadCustomer)
  yield takeEvery(createCustomer.toString(), handleCreateCustomer)
  yield takeEvery(updateCustomer.toString(), handleUpdateCustomer)
  yield takeEvery(deleteCustomer.toString(), handleDeleteCustomer)
}
