import { takeEvery, call, put } from 'redux-saga/effects';

import { getOrganizationBalances } from 'api/balances.js';

import { loadOrganizationBalances } from 'actions/balances.js';

function* handleLoadOrganizationBalances({ payload: { organizationId } }) {
  try {
    yield put(loadOrganizationBalances.request(organizationId));
    const balances = yield call(getOrganizationBalances, organizationId);
    yield put(loadOrganizationBalances.success(organizationId, balances));
  } catch (error) {
    yield put(loadOrganizationBalances.failure(error));
  }
}

export default function* () {
  yield takeEvery(loadOrganizationBalances.toString(), handleLoadOrganizationBalances);
}
