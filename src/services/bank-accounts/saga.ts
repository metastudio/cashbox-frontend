import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { ActionType, getType } from 'typesafe-actions';

import {
  deleteOrganizationBankAccount,
  getOrganizationBankAccount,
  getOrganizationBankAccounts,
  getOrganizationVisibleBankAccounts,
  postOrganizationBankAccount,
  putOrganizationBankAccount,
  putOrganizationBankAccountPosition,
} from './api';

import {
  createBankAccount,
  deleteBankAccount,
  loadBankAccount,
  loadBankAccounts,
  loadVisibleBankAccounts,
  updateBankAccount,
  updateBankAccountPosition,
} from './actions';

function* handleLoadBankAccounts(
  { payload: { orgId } }: ActionType<typeof loadBankAccounts.request>,
) {
  try {
    const bankAccounts = yield call(getOrganizationBankAccounts, orgId);
    yield put(loadBankAccounts.success(orgId, bankAccounts));
  } catch (error) {
    yield put(loadBankAccounts.failure(error));
  }
}

function* handleLoadVisibleBankAccounts(
  { payload: { orgId } }: ActionType<typeof loadVisibleBankAccounts.request>,
) {
  try {
    const bankAccounts = yield call(getOrganizationVisibleBankAccounts, orgId);
    yield put(loadVisibleBankAccounts.success(orgId, bankAccounts));
  } catch (error) {
    yield put(loadVisibleBankAccounts.failure(error));
  }
}

function* handleLoadBankAccount(
  { payload: { orgId, bankAccountId } }: ActionType<typeof loadBankAccount.request>,
) {
  try {
    const bankAccount = yield call(getOrganizationBankAccount, orgId, bankAccountId);
    yield put(loadBankAccount.success(orgId, bankAccount));
  } catch (error) {
    yield put(loadBankAccount.failure(error));
  }
}

function* handleCreateBankAccount(
  {
    payload: { orgId, data },
    meta:    { resolve, reject },
  }: ActionType<typeof createBankAccount.request>,
) {
  try {
    const bankAccount = yield call(postOrganizationBankAccount, orgId, data);
    yield put(createBankAccount.success(orgId, bankAccount));
    yield call(resolve, bankAccount);
  } catch (error) {
    yield put(createBankAccount.failure(error));
    yield call(reject, error);
  }
}

function* handleUpdateBankAccount(
  {
    payload: { orgId, bankAccountId, data },
    meta:    { resolve, reject },
  }: ActionType<typeof updateBankAccount.request>,
) {
  try {
    const bankAccount = yield call(putOrganizationBankAccount, orgId, bankAccountId, data);
    yield put(updateBankAccount.success(orgId, bankAccount));
    yield call(resolve, bankAccount);
  } catch (error) {
    yield put(updateBankAccount.failure(error));
    yield call(reject, error);
  }
}

function* handleUpdateBankAccountPosition(
  {
    payload: { orgId, bankAccountId, data },
    meta:    { resolve, reject },
  }: ActionType<typeof updateBankAccountPosition.request>,
) {
  try {
    const bankAccount = yield call(putOrganizationBankAccountPosition, orgId, bankAccountId, data);
    yield put(updateBankAccountPosition.success(orgId, bankAccount));
    yield call(resolve, bankAccount);
  } catch (error) {
    yield put(updateBankAccountPosition.failure(error));
    yield call(reject, error);
  }
}

function* handleDeleteBankAccount(
  {
    payload: { orgId, bankAccountId },
    meta:    { resolve, reject },
  }: ActionType<typeof deleteBankAccount.request>,
) {
  try {
    const bankAccount = yield call(deleteOrganizationBankAccount, orgId, bankAccountId);
    yield put(deleteBankAccount.success(orgId, bankAccount));
    yield call(resolve, bankAccount);
  } catch (error) {
    yield put(deleteBankAccount.failure(error));
    yield call(reject, error);
  }
}

export default function* () {
  yield takeLatest(getType(loadBankAccounts.request),         handleLoadBankAccounts);
  yield takeLatest(getType(loadVisibleBankAccounts.request),  handleLoadVisibleBankAccounts);
  yield takeLatest(getType(loadBankAccount.request),          handleLoadBankAccount);
  yield takeEvery(getType(createBankAccount.request),         handleCreateBankAccount);
  yield takeEvery(getType(updateBankAccount.request),         handleUpdateBankAccount);
  yield takeEvery(getType(updateBankAccountPosition.request), handleUpdateBankAccountPosition);
  yield takeEvery(getType(deleteBankAccount.request),         handleDeleteBankAccount);
}
