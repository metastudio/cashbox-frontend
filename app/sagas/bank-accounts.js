import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'

import { getOrganizationBankAccounts } from 'api'

import {
  loadBankAccounts,
} from 'actions'

function* handleLoadBankAccounts({ payload: { organizationId }}) {
  try {
    yield put(loadBankAccounts.request(organizationId))
    const bankAccounts = yield call(getOrganizationBankAccounts, organizationId)
    yield put(loadBankAccounts.success(organizationId, bankAccounts))
  } catch (error) {
    yield put(loadBankAccounts.failure(error))
  }
}

export default function* () {
  yield takeEvery(loadBankAccounts.toString(), handleLoadBankAccounts)
}
