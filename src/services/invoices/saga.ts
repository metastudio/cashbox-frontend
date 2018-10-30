import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { ActionType, getType } from 'typesafe-actions';

import {
  createInvoice,
  destroyInvoice,
  downloadInvoicePDF,
  loadInvoice,
  loadInvoices,
  loadUnpaidInvoices,
  loadUnpaidInvoicesCount,
  updateInvoice,
} from './actions';
import {
  deleteInvoice,
  getInvoice,
  getInvoicePDF,
  getInvoices,
  getUnpaidInvoices,
  getUnpaidInvoicesCount,
  patchInvoice,
  postInvoice,
} from './api';

function* handleLoadInvoices(
  { payload: { orgId, query } }: ActionType<typeof loadInvoices.request>,
) {
  try {
    const { invoices, pagination } = yield call(getInvoices, orgId, query);
    yield put(loadInvoices.success(orgId, invoices, pagination));
  } catch (error) {
    yield put(loadInvoices.failure(error));
  }
}

function* handleLoadUnpaidInvoices(
  { payload: { orgId, query } }: ActionType<typeof loadUnpaidInvoices.request>,
) {
  try {
    const { invoices, pagination } = yield call(getUnpaidInvoices, orgId, query);
    yield put(loadUnpaidInvoices.success(orgId, invoices, pagination));
  } catch (error) {
    yield put(loadUnpaidInvoices.failure(error));
  }
}

function* handleLoadUnpaidInvoicesCount(
  { payload: { orgId } }: ActionType<typeof loadUnpaidInvoicesCount.request>,
) {
  try {
    const { unpaidCount } = yield call(getUnpaidInvoicesCount, orgId);
    yield put(loadUnpaidInvoicesCount.success(orgId, unpaidCount));
  } catch (error) {
    yield put(loadUnpaidInvoicesCount.failure(error));
  }
}

function* handleLoadInvoice(
  { payload: { orgId, invoiceId } }: ActionType<typeof loadInvoice.request>,
) {
  try {
    const invoice = yield call(getInvoice, orgId, invoiceId);
    yield put(loadInvoice.success(orgId, invoice));
  } catch (error) {
    yield put(loadInvoice.failure(error));
  }
}

function* handleCreateInvoice(
  {
    payload: { orgId, data },
    meta:    { resolve, reject },
  }: ActionType<typeof createInvoice.request>,
) {
  try {
    const invoice = yield call(postInvoice, orgId, data);
    yield put(createInvoice.success(orgId, invoice));
    yield call(resolve, invoice);
  } catch (error) {
    yield put(createInvoice.failure(error));
    yield call(reject, error);
  }
}

function* handleUpdateInvoice(
  {
    payload: { orgId, invoiceId, data },
    meta:    { resolve, reject },
  }: ActionType<typeof updateInvoice.request>,
) {
  try {
    const invoice = yield call(patchInvoice, orgId, invoiceId, data);
    yield put(updateInvoice.success(orgId, invoice));
    yield call(resolve, invoice);
  } catch (error) {
    yield put(updateInvoice.failure(error));
    yield call(reject, error);
  }
}

function* handleDestroyInvoice(
  {
    payload: { orgId, invoiceId },
    meta:    { resolve, reject },
  }: ActionType<typeof destroyInvoice.request>,
) {
  try {
    const invoice = yield call(deleteInvoice, orgId, invoiceId);
    yield put(destroyInvoice.success(orgId, invoice));
    yield call(resolve, invoice);
  } catch (error) {
    yield put(destroyInvoice.failure(error));
    yield call(reject, error);
  }
}

function* handleDownoadInvoicePDF(
  {
    payload: { orgId, invoiceId },
    meta:    { resolve, reject },
  }: ActionType<typeof downloadInvoicePDF.request>,
) {
  try {
    const pdf = yield call(getInvoicePDF, orgId, invoiceId);
    yield put(downloadInvoicePDF.success(orgId, pdf));
    yield call(resolve, pdf);
  } catch (error) {
    yield put(downloadInvoicePDF.failure(error));
    yield call(reject, error);
  }
}

export default function* () {
  yield takeLatest(getType(loadInvoices.request),            handleLoadInvoices);
  yield takeLatest(getType(loadUnpaidInvoices.request),      handleLoadUnpaidInvoices);
  yield takeLatest(getType(loadUnpaidInvoicesCount.request), handleLoadUnpaidInvoicesCount);
  yield takeLatest(getType(loadInvoice.request),             handleLoadInvoice);
  yield takeEvery(getType(createInvoice.request),            handleCreateInvoice);
  yield takeEvery(getType(updateInvoice.request),            handleUpdateInvoice);
  yield takeEvery(getType(destroyInvoice.request),           handleDestroyInvoice);
  yield takeEvery(getType(downloadInvoicePDF.request),       handleDownoadInvoicePDF);
}
