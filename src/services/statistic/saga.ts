import { call, put, takeLatest } from 'redux-saga/effects';
import { ActionType, getType } from 'typesafe-actions';

import {
  getBalanceStatistic,
} from './api';

import {
  loadBalanceStatistic,
} from './actions';

function* handleLoadBalanceStatistic(
  { payload: { orgId, query } }: ActionType<typeof loadBalanceStatistic.request>,
) {
  try {
    const { statistic, pagination } = yield call(getBalanceStatistic, orgId, query);
    yield put(loadBalanceStatistic.success(orgId, statistic, pagination));
  } catch (error) {
    yield put(loadBalanceStatistic.failure(error));
  }
}

export default function* () {
  yield takeLatest(getType(loadBalanceStatistic.request), handleLoadBalanceStatistic);
}
