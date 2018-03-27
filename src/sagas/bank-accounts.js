import { takeEvery, call, put } from 'redux-saga/effects';

import { ValidationError } from 'api/errors.js';
import {
  getOrganizationBankAccounts,
  getOrganizationBankAccount,
  postOrganizationBankAccount,
  putOrganizationBankAccount,
  deleteOrganizationBankAccount,
} from 'api/bank-accounts.js';

import {
  loadBankAccounts,
  loadBankAccount,
  createBankAccount,
  updateBankAccount,
  deleteBankAccount,
} from 'actions/bank-accounts.js';

function* handleLoadBankAccounts({ payload: { organizationId } }) {
  try {
    yield put(loadBankAccounts.request(organizationId));
    const bankAccounts = yield call(getOrganizationBankAccounts, organizationId);
    yield put(loadBankAccounts.success(organizationId, bankAccounts));
  } catch (error) {
    yield put(loadBankAccounts.failure(error));
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
    const errors = error instanceof ValidationError ? error.errors : { _error: error.message };
    yield call(reject, errors);
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
    const errors = error instanceof ValidationError ? error.errors : { _error: error.message };
    yield call(reject, errors);
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
  yield takeEvery(loadBankAccounts.toString(), handleLoadBankAccounts);
  yield takeEvery(loadBankAccount.toString(), handleLoadBankAccount);
  yield takeEvery(createBankAccount.toString(), handleCreateBankAccount);
  yield takeEvery(updateBankAccount.toString(), handleUpdateBankAccount);
  yield takeEvery(deleteBankAccount.toString(), handleDeleteBankAccount);
}
