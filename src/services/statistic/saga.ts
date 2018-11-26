import { call, put, takeLatest } from 'redux-saga/effects';
import { ActionType, getType } from 'typesafe-actions';

import {
  getBalanceStatistic,
  getExpenseCustomersStatistic,
  getIncomeCategoriesStatistic,
  getIncomeCustomersStatistic,
} from './api';

import {
  loadBalanceStatistic,
  loadExpenseCustomersStatistic,
  loadIncomeCategoriesStatistic,
  loadIncomeCustomersStatistic,
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

function* handleLoadIncomeCustomersStatistic(
  { payload: { orgId, query } }: ActionType<typeof loadIncomeCustomersStatistic.request>,
) {
  try {
    const { statistic } = yield call(getIncomeCustomersStatistic, orgId, query);
    yield put(loadIncomeCustomersStatistic.success(orgId, statistic));
  } catch (error) {
    yield put(loadIncomeCustomersStatistic.failure(error));
  }
}

function* handleLoadExpenseCustomersStatistic(
  { payload: { orgId, query } }: ActionType<typeof loadExpenseCustomersStatistic.request>,
) {
  try {
    const { statistic } = yield call(getExpenseCustomersStatistic, orgId, query);
    yield put(loadExpenseCustomersStatistic.success(orgId, statistic));
  } catch (error) {
    yield put(loadExpenseCustomersStatistic.failure(error));
  }
}

export default function* () {
  yield takeLatest(getType(loadBalanceStatistic.request),          handleLoadBalanceStatistic);
  yield takeLatest(getType(loadIncomeCategoriesStatistic.request), handleLoadIncomeCategoriesStatistic);
  yield takeLatest(getType(loadIncomeCustomersStatistic.request),  handleLoadIncomeCustomersStatistic);
  yield takeLatest(getType(loadExpenseCustomersStatistic.request), handleLoadExpenseCustomersStatistic);
}
