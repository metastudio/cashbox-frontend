import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'

import { getOrganizationBalances } from 'api'

import {
  loadOrganizationBalances, loadOrganizationBalancesRequest, loadOrganizationBalancesSuccess, loadOrganizationBalancesFailure,
} from 'actions'

function* handleLoadOrganizationBalances({ payload: { organizationId }}) {
  try {
    yield put(loadOrganizationBalancesRequest(organizationId))
    const balances = yield call(getOrganizationBalances, organizationId)
    yield put(loadOrganizationBalancesSuccess(organizationId, balances))
  } catch (error) {
    yield put(loadOrganizationBalancesFailure(error))
  }
}

export default function* () {
  yield takeEvery(loadOrganizationBalances.toString(), handleLoadOrganizationBalances)
}
