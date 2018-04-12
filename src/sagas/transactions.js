import { takeEvery, call, put } from 'redux-saga/effects';

import {
  getOrganizationTransactions,
  postOrganizationTransaction,
  postOrganizationTransfer
} from 'api/transactions.js';

import {
  loadTransactions,
  createTransaction,
  createTransfer
} from 'actions/transactions.js';

function* handleLoadTransactions({ payload: { organizationId } }) {
  try {
    yield put(loadTransactions.request(organizationId));
    const transactions = yield call(getOrganizationTransactions, organizationId);
    yield put(loadTransactions.success(organizationId, transactions));
  } catch (error) {
    yield put(loadTransactions.failure(error));
  }
}

function* handleCreateTransaction({ payload: { organizationId, data }, meta: { resolve, reject } }) {
  try {
    yield put(createTransaction.request(organizationId));
    const transaction = yield call(postOrganizationTransaction, organizationId, data);
    yield put(createTransaction.success(organizationId, transaction));
    yield call(resolve, transaction);
  } catch (error) {
    yield put(createTransaction.failure(error));
    yield call(reject, error);
  }
}

function* handleCreateTransfer({ payload: { organizationId, data }, meta: { resolve, reject } }) {
  try {
    yield put(createTransfer.request(organizationId));
    const transfer = yield call(postOrganizationTransfer, organizationId, data);
    yield put(createTransfer.success(organizationId, transfer));
    yield call(resolve, transfer);
  } catch (error) {
    yield put(createTransfer.failure(error));
    yield call(reject, error);
  }
}

export default function* () {
  yield takeEvery(loadTransactions.toString(),  handleLoadTransactions);
  yield takeEvery(createTransaction.toString(), handleCreateTransaction);
  yield takeEvery(createTransfer.toString(),    handleCreateTransfer);
}
