import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'

import { getOrganizationCustomers } from 'api'

import { loadCustomers } from 'actions'

function* handleLoadCustomers({ payload: { organizationId }}) {
  try {
    yield put(loadCustomers.request(organizationId))
    const customers = yield call(getOrganizationCustomers, organizationId)
    yield put(loadCustomers.success(organizationId, customers))
  } catch (error) {
    yield put(loadCustomers.failure(error))
  }
}

export default function* () {
  yield takeEvery(loadCustomers.toString(),  handleLoadCustomers)
}
