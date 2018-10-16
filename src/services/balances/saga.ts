import { call, put, takeLatest } from 'redux-saga/effects';
import { ActionType, getType } from 'typesafe-actions';

import { getOrganizationBalances } from './api';

import { loadOrganizationBalances } from './actions';

function* handleLoadOrganizationBalances(
  { payload: { orgId } }: ActionType<typeof loadOrganizationBalances.request>,
) {
  try {
    const balances = yield call(getOrganizationBalances, orgId);
    yield put(loadOrganizationBalances.success(orgId, balances));
  } catch (error) {
    yield put(loadOrganizationBalances.failure(error));
  }
}

export default function* () {
  yield takeLatest(getType(loadOrganizationBalances.request), handleLoadOrganizationBalances);
}
