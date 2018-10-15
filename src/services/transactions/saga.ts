import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { ActionType, getType } from 'typesafe-actions';

import { updateMemberLastVisit } from 'services/members';
import {
  createTransaction,
  createTransfer,
  destroyTransaction,
  loadTransaction,
  loadTransactions,
  updateTransaction,
} from './actions';
import {
  deleteOrganizationTransaction,
  getOrganizationTransaction,
  getOrganizationTransactions,
  patchOrganizationTransaction,
  postOrganizationTransaction,
  postOrganizationTransfer,
} from './api';

function* handleLoadTransactions(
  { payload: { orgId, query } }: ActionType<typeof loadTransactions.request>,
) {
  try {
    const { transactions, pagination } = yield call(getOrganizationTransactions, orgId, query);
    yield put(loadTransactions.success(orgId, transactions, pagination));
    yield put(updateMemberLastVisit(orgId));
  } catch (error) {
    yield put(loadTransactions.failure(error));
  }
}

function* handleLoadTransaction(
  { payload: { orgId, transactionId } }: ActionType<typeof loadTransaction.request>,
) {
  try {
    const transaction = yield call(getOrganizationTransaction, orgId, transactionId);
    yield put(loadTransaction.success(orgId, transaction));
  } catch (error) {
    yield put(loadTransaction.failure(error));
  }
}

function* handleCreateTransaction(
  { payload: { orgId, data }, meta: { resolve, reject } }: ActionType<typeof createTransaction.request>,
) {
  try {
    const transaction = yield call(postOrganizationTransaction, orgId, data);
    yield put(createTransaction.success(orgId, transaction));
    yield call(resolve, transaction);
  } catch (error) {
    yield put(createTransaction.failure(error));
    yield call(reject, error);
  }
}

function* handleCreateTransfer(
  { payload: { orgId, data }, meta: { resolve, reject } }: ActionType<typeof createTransfer.request>,
) {
  try {
    const transfer = yield call(postOrganizationTransfer, orgId, data);
    yield put(createTransfer.success(orgId, transfer));
    yield call(resolve, transfer);
  } catch (error) {
    yield put(createTransfer.failure(error));
    yield call(reject, error);
  }
}

function* handleUpdateTransaction(
  { payload, meta }: ActionType<typeof updateTransaction.request>,
) {
  try {
    const transaction = yield call(
      patchOrganizationTransaction,
      payload.orgId,
      payload.transactionId,
      payload.data,
    );
    yield put(updateTransaction.success(payload.orgId, transaction));
    yield call(meta.resolve, transaction);
  } catch (error) {
    yield put(updateTransaction.failure(error));
    yield call(meta.reject, error);
  }
}

function* handleDestroyTransaction(
  { payload, meta }: ActionType<typeof destroyTransaction.request>,
) {
  try {
    yield call(deleteOrganizationTransaction, payload.orgId, payload.transactionId);
    yield put(destroyTransaction.success(payload.orgId, payload.transactionId));
    yield call(meta.resolve, payload.transactionId);
  } catch (error) {
    yield put(destroyTransaction.failure(error));
    yield call(meta.reject, error);
  }
}

export default function* () {
  yield takeLatest(getType(loadTransactions.request),  handleLoadTransactions);
  yield takeLatest(getType(loadTransaction.request),   handleLoadTransaction);
  yield takeEvery(getType(createTransaction.request),  handleCreateTransaction);
  yield takeEvery(getType(createTransfer.request),     handleCreateTransfer);
  yield takeEvery(getType(updateTransaction.request),  handleUpdateTransaction);
  yield takeEvery(getType(destroyTransaction.request), handleDestroyTransaction);
}
