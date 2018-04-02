import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'

import {
  getInvoices,
  postInvoice,
  getInvoice,
  deleteInvoice,
  patchInvoice,
  getInvoicePDF
} from 'api'

import { ValidationError } from 'api/errors'

import {
  loadInvoices,
  createInvoice,
  loadInvoice,
  destroyInvoice,
  downloadInvoicePDF,
  updateInvoice
} from 'actions'

function* handleLoadInvoices({ payload: { organizationId, params }}) {
  try {
    yield put(loadInvoices.request(organizationId))
    const { invoices, pagination, unpaidCount } = yield call(getInvoices, organizationId, params)
    yield put(loadInvoices.success(organizationId, invoices, pagination, unpaidCount))
  } catch (error) {
    yield put(loadInvoices.failure(error))
  }
}

function* handleCreateInvoice({ payload: { organizationId, data }, meta: { resolve, reject } }) {
  try {
    yield put(createInvoice.request(organizationId))
    const invoice = yield call(postInvoice, organizationId, data)
    yield put(createInvoice.success(organizationId, invoice))
    yield call(resolve, invoice)
  } catch (error) {
    yield put(createInvoice.failure(error))
    const errors = error instanceof ValidationError ? error.errors : { _error: error.message }
    yield call(reject, errors)
  }
}

function* handleLoadInvoice({ payload: { organizationId, invoiceId }}) {
  try {
    yield put(loadInvoice.request(organizationId, invoiceId))
    const invoice = yield call(getInvoice, organizationId, invoiceId)
    yield put(loadInvoice.success(organizationId, invoice))
  } catch (error) {
    yield put(loadInvoice.failure(error))
  }
}

function* handleDestroyInvoice({ payload: { organizationId, invoiceId }, meta: { resolve, reject } }) {
  try {
    yield put(destroyInvoice.request(organizationId))
    const invoice = yield call(deleteInvoice, organizationId, invoiceId)
    yield put(destroyInvoice.success(organizationId, invoice))
    yield call(resolve, invoice)
  } catch (error) {
    yield put(destroyInvoice.failure(error))
    yield call(reject)
  }
}

function* handleDownoadInvoicePDF({ payload: { organizationId, invoiceId }}) {
  try {
    yield put(loadInvoice.request(organizationId, invoiceId))
    const invoice = yield call(getInvoicePDF, organizationId, invoiceId)
    yield put(loadInvoice.success(organizationId, invoice))
  } catch (error) {
    yield put(loadInvoice.failure(error))
  }
}

function* handleUpdateInvoice({ payload: { organizationId, invoiceId, data }, meta: { resolve, reject } }) {
  try {
    yield put(updateInvoice.request(organizationId))
    const invoice = yield call(patchInvoice, organizationId, invoiceId, data)
    yield put(updateInvoice.success(organizationId, invoice))
    yield call(resolve, invoice)
  } catch (error) {
    yield put(updateInvoice.failure(error))
    const errors = error instanceof ValidationError ? error.errors : { _error: error.message }
    yield call(reject, errors)
  }
}

export default function* () {
  yield takeEvery(loadInvoices.toString(),  handleLoadInvoices)
  yield takeEvery(createInvoice.toString(), handleCreateInvoice)
  yield takeEvery(updateInvoice.toString(), handleUpdateInvoice)
  yield takeEvery(loadInvoice.toString(), handleLoadInvoice)
  yield takeEvery(destroyInvoice.toString(), handleDestroyInvoice)
  yield takeEvery(downloadInvoicePDF.toString(), handleDownoadInvoicePDF)
}

