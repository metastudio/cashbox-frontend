import { call, put, takeEvery } from 'redux-saga/effects';

import {
  getInvoices,
  getUnpaidInvoices,
  getUnpaidInvoicesCount,
  postInvoice,
  getInvoice,
  deleteInvoice,
  patchInvoice,
  getInvoicePDF,
} from './api.js';

import {
  loadInvoices,
  loadUnpaidInvoices,
  loadUnpaidInvoicesCount,
  createInvoice,
  loadInvoice,
  destroyInvoice,
  downloadInvoicePDF,
  updateInvoice,
} from './actions.js';

function* handleLoadInvoices({ payload: { organizationId, params } }) {
  try {
    yield put(loadInvoices.request(organizationId));
    const { invoices, pagination } = yield call(getInvoices, organizationId, params);
    yield put(loadInvoices.success(organizationId, invoices, pagination));
  } catch (error) {
    yield put(loadInvoices.failure(error));
  }
}

function* handleLoadUnpaidInvoices({ payload: { organizationId, params } }) {
  try {
    yield put(loadUnpaidInvoices.request(organizationId));
    const { invoices, pagination } = yield call(getUnpaidInvoices, organizationId, params);
    yield put(loadUnpaidInvoices.success(organizationId, invoices, pagination));
  } catch (error) {
    yield put(loadUnpaidInvoices.failure(error));
  }
}

function* handleLoadUnpaidInvoicesCount({ payload: { organizationId } }) {
  try {
    yield put(loadUnpaidInvoicesCount.request(organizationId));
    const { unpaidCount } = yield call(getUnpaidInvoicesCount, organizationId);
    yield put(loadUnpaidInvoicesCount.success(organizationId, unpaidCount));
  } catch (error) {
    yield put(loadUnpaidInvoicesCount.failure(error));
  }
}

function* handleCreateInvoice({ payload: { organizationId, data }, meta: { resolve, reject } }) {
  try {
    yield put(createInvoice.request(organizationId));
    const invoice = yield call(postInvoice, organizationId, data);
    yield put(createInvoice.success(organizationId, invoice));
    yield call(resolve, invoice);
  } catch (error) {
    yield put(createInvoice.failure(error));
    yield call(reject, error);
  }
}

function* handleLoadInvoice({ payload: { organizationId, invoiceId } }) {
  try {
    yield put(loadInvoice.request(organizationId, invoiceId));
    const invoice = yield call(getInvoice, organizationId, invoiceId);
    yield put(loadInvoice.success(organizationId, invoice));
  } catch (error) {
    yield put(loadInvoice.failure(error));
  }
}

function* handleDestroyInvoice({ payload: { organizationId, invoiceId }, meta: { resolve, reject } }) {
  try {
    yield put(destroyInvoice.request(organizationId));
    const invoice = yield call(deleteInvoice, organizationId, invoiceId);
    yield put(destroyInvoice.success(organizationId, invoice));
    yield call(resolve, invoice);
  } catch (error) {
    yield put(destroyInvoice.failure(error));
    yield call(reject);
  }
}

function* handleDownoadInvoicePDF({ payload: { organizationId, invoiceId }, meta: { resolve, reject } }) {
  try {
    yield put(downloadInvoicePDF.request(organizationId, invoiceId));
    const invoice = yield call(getInvoicePDF, organizationId, invoiceId);
    yield put(downloadInvoicePDF.success(organizationId, invoice));
    yield call(resolve, invoice);
  } catch (error) {
    yield put(downloadInvoicePDF.failure(error));
    yield call(reject, error);
  }
}

function* handleUpdateInvoice({ payload: { organizationId, invoiceId, data }, meta: { resolve, reject } }) {
  try {
    yield put(updateInvoice.request(organizationId));
    const invoice = yield call(patchInvoice, organizationId, invoiceId, data);
    yield put(updateInvoice.success(organizationId, invoice));
    yield call(resolve, invoice);
  } catch (error) {
    yield put(updateInvoice.failure(error));
    yield call(reject, error);
  }
}

export default function* () {
  yield takeEvery(loadInvoices,            handleLoadInvoices);
  yield takeEvery(loadUnpaidInvoices,      handleLoadUnpaidInvoices);
  yield takeEvery(loadUnpaidInvoicesCount, handleLoadUnpaidInvoicesCount);
  yield takeEvery(createInvoice,           handleCreateInvoice);
  yield takeEvery(updateInvoice,           handleUpdateInvoice);
  yield takeEvery(loadInvoice,             handleLoadInvoice);
  yield takeEvery(destroyInvoice,          handleDestroyInvoice);
  yield takeEvery(downloadInvoicePDF,      handleDownoadInvoicePDF);
}
