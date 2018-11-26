import { call, put, takeLatest } from 'redux-saga/effects';
import { ActionType, getType } from 'typesafe-actions';

import {
  getBalanceStatistic, getIncomeCategoriesStatistic,
} from './api';

import {
  loadBalanceStatistic,
  loadIncomeCategoriesStatistic,
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

function* handleLoadIncomeCategoriesStatistic(
  { payload: { orgId, query } }: ActionType<typeof loadIncomeCategoriesStatistic.request>,
) {
  try {
    const { statistic } = yield call(getIncomeCategoriesStatistic, orgId, query);
    yield put(loadIncomeCategoriesStatistic.success(orgId, statistic));
  } catch (error) {
    yield put(loadIncomeCategoriesStatistic.failure(error));
  }
}

export default function* () {
  yield takeLatest(getType(loadBalanceStatistic.request),          handleLoadBalanceStatistic);
  yield takeLatest(getType(loadIncomeCategoriesStatistic.request), handleLoadIncomeCategoriesStatistic);
}
