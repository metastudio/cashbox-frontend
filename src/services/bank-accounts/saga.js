import { takeEvery, takeLatest, call, put } from 'redux-saga/effects';

import {
  getOrganizationBankAccounts,
  getOrganizationVisibleBankAccounts,
  getOrganizationBankAccount,
  postOrganizationBankAccount,
  putOrganizationBankAccount,
  deleteOrganizationBankAccount,
} from './api.js';

import {
  loadBankAccounts,
  loadVisibleBankAccounts,
  loadBankAccount,
  createBankAccount,
  updateBankAccount,
  deleteBankAccount,
} from './actions.js';

function* handleLoadBankAccounts({ payload: { organizationId } }) {
  try {
    yield put(loadBankAccounts.request(organizationId));
    const bankAccounts = yield call(getOrganizationBankAccounts, organizationId);
    yield put(loadBankAccounts.success(organizationId, bankAccounts));
  } catch (error) {
    yield put(loadBankAccounts.failure(error));
  }
}

function* handleLoadVisibleBankAccounts({ payload: { organizationId } }) {
  try {
    yield put(loadVisibleBankAccounts.request(organizationId));
    const bankAccounts = yield call(getOrganizationVisibleBankAccounts, organizationId);
    yield put(loadVisibleBankAccounts.success(organizationId, bankAccounts));
  } catch (error) {
    yield put(loadVisibleBankAccounts.failure(error));
  }
}

function* handleLoadBankAccount({ payload: { organizationId, bankAccountId } }) {
  try {
    yield put(loadBankAccount.request(organizationId, bankAccountId));
    const bankAccount = yield call(getOrganizationBankAccount, organizationId, bankAccountId);
    yield put(loadBankAccount.success(organizationId, bankAccount));
  } catch (error) {
    yield put(loadBankAccount.failure(error));
  }
}

function* handleCreateBankAccount({ payload: { organizationId, data }, meta: { resolve, reject } }) {
  try {
    yield put(createBankAccount.request(organizationId));
    const bankAccount = yield call(postOrganizationBankAccount, organizationId, data);
    yield put(createBankAccount.success(organizationId, bankAccount));
    yield call(resolve, bankAccount);
  } catch (error) {
    yield put(createBankAccount.failure(error));
    yield call(reject, error);
  }
}

function* handleUpdateBankAccount({ payload: { organizationId, bankAccountId, data }, meta: { resolve, reject } }) {
  try {
    yield put(updateBankAccount.request(organizationId, bankAccountId));
    const bankAccount = yield call(putOrganizationBankAccount, organizationId, bankAccountId, data);
    yield put(updateBankAccount.success(organizationId, bankAccountId, bankAccount));
    yield call(resolve, bankAccount);
  } catch (error) {
    yield put(updateBankAccount.failure(error));
    yield call(reject, error);
  }
}

function* handleDeleteBankAccount({ payload: { organizationId, bankAccountId }, meta: { resolve, reject } }) {
  try {
    yield put(deleteBankAccount.request(organizationId, bankAccountId));
    const bankAccount = yield call(deleteOrganizationBankAccount, organizationId, bankAccountId);
    yield put(deleteBankAccount.success(organizationId, bankAccount));
    yield call(resolve, bankAccount);
  } catch (error) {
    yield put(deleteBankAccount.failure(error));
    yield call(reject, error);
  }
}

export default function* () {
  yield takeLatest(loadBankAccounts,        handleLoadBankAccounts);
  yield takeLatest(loadVisibleBankAccounts, handleLoadVisibleBankAccounts);
  yield takeLatest(loadBankAccount,         handleLoadBankAccount);
  yield takeEvery(createBankAccount,        handleCreateBankAccount);
  yield takeEvery(updateBankAccount,        handleUpdateBankAccount);
  yield takeEvery(deleteBankAccount,        handleDeleteBankAccount);
}
