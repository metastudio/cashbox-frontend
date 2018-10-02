import { call, put, takeLatest } from 'redux-saga/effects';
import { ActionType, getType } from 'typesafe-actions';

import {
  getTransactionsSummary,
} from './api';

import {
  loadTransactionsSummary,
} from './actions';

function* handleLoadTransactionsSummary(
  { payload: { orgId, query } }: ActionType<typeof loadTransactionsSummary.request>,
) {
  try {
    const { transactionsSummary } = yield call(getTransactionsSummary, orgId, query);
    yield put(loadTransactionsSummary.success(orgId, transactionsSummary));
  } catch (error) {
    yield put(loadTransactionsSummary.failure(error));
  }
}

export default function* () {
  yield takeLatest(getType(loadTransactionsSummary.request), handleLoadTransactionsSummary);
}
