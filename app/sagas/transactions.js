import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'

import { ValidationError } from 'api/errors'
import { getOrganizationTransactions, postOrganizationTransaction } from 'api'

import { loadTransactions, createTransaction } from 'actions'

function* handleLoadTransactions({ payload: { organizationId }}) {
  try {
    yield put(loadTransactions.request(organizationId))
    const transactions = yield call(getOrganizationTransactions, organizationId)
    yield put(loadTransactions.success(organizationId, transactions))
  } catch (error) {
    yield put(loadTransactions.failure(error))
  }
}

function* handleCreateTransaction({ payload: { organizationId, data }, meta: { resolve, reject } }) {
  try {
    yield put(createTransaction.request(organizationId))
    const transaction = yield call(postOrganizationTransaction, organizationId, data)
    yield put(createTransaction.success(organizationId, transaction))
    yield call(resolve, transaction)
  } catch (error) {
    yield put(createTransaction.failure(error))
    const errors = error instanceof ValidationError ? error.errors : { _error: error.message }
    yield call(reject, errors)
  }
}

export default function* () {
  yield takeEvery(loadTransactions.toString(),  handleLoadTransactions)
  yield takeEvery(createTransaction.toString(), handleCreateTransaction)
}
