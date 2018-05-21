import { takeEvery, call, put } from 'redux-saga/effects';

import {
  getOrganizationTransactions,
  getOrganizationTransaction,
  postOrganizationTransaction,
  postOrganizationTransfer,
  patchOrganizationTransaction,
  deleteOrganizationTransaction,
} from 'api/transactions.js';
import { putMemberLastVisit } from 'api/members.js';

import {
  loadTransactions,
  loadTransaction,
  createTransaction,
  createTransfer,
  updateTransaction,
  destroyTransaction
} from 'actions/transactions.js';
import { updateMemberLastVisit } from 'actions/members.js';

function* handleLoadTransactions({ payload: { organizationId } }) {
  try {
    yield put(loadTransactions.request(organizationId));
    const transactions = yield call(getOrganizationTransactions, organizationId);
    yield put(loadTransactions.success(organizationId, transactions));
    yield put(updateMemberLastVisit.request(organizationId));
    const member = yield call(putMemberLastVisit, organizationId);
    yield put(updateMemberLastVisit.success(organizationId, member));
  } catch (error) {
    yield put(loadTransactions.failure(error));
  }
}

function* handleLoadTransaction({ payload: { organizationId, transactionId } }) {
  try {
    yield put(loadTransaction.request(organizationId, transactionId));
    const transaction = yield call(getOrganizationTransaction, organizationId, transactionId);
    yield put(loadTransaction.success(organizationId, transaction));
  } catch (error) {
    yield put(loadTransaction.failure(error));
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

function* handleUpdateTransaction({ payload: { organizationId, transactionId, data }, meta: { resolve, reject } }) {
  try {
    yield put(updateTransaction.request(organizationId));
    const transaction = yield call(patchOrganizationTransaction, organizationId, transactionId, data);
    yield put(updateTransaction.success(organizationId, transaction));
    yield call(resolve, transaction);
  } catch (error) {
    yield put(updateTransaction.failure(error));
    yield call(reject, error);
  }
}

function* handleDestroyTransaction({ payload: { organizationId, transactionId }, meta: { resolve, reject } }) {
  try {
    yield put(destroyTransaction.request(organizationId));
    const transaction = yield call(deleteOrganizationTransaction, organizationId, transactionId);
    yield put(destroyTransaction.success(organizationId, transaction));
    yield call(resolve, transaction);
  } catch (error) {
    yield put(destroyTransaction.failure(error));
    yield call(reject);
  }
}

export default function* () {
  yield takeEvery(loadTransactions,   handleLoadTransactions);
  yield takeEvery(loadTransaction,    handleLoadTransaction);
  yield takeEvery(createTransaction,  handleCreateTransaction);
  yield takeEvery(createTransfer,     handleCreateTransfer);
  yield takeEvery(updateTransaction,  handleUpdateTransaction);
  yield takeEvery(destroyTransaction, handleDestroyTransaction);
}
