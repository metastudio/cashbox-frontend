import { call, put, takeLatest } from 'redux-saga/effects';
import { ActionType, getType } from 'typesafe-actions';

import {
  getBalancesByCustomersStatistic,
  getBalanceStatistic,
  getExpenseCategoriesStatistic,
  getExpenseCustomersByMonthsStatistic,
  getExpenseCustomersStatistic,
  getIncomeCategoriesStatistic,
  getIncomeCustomersByMonthsStatistic,
  getIncomeCustomersStatistic,
  getTotalsByCustomersStatistic,
} from './api';

import {
  loadBalancesByCustomersStatistic,
  loadBalanceStatistic,
  loadExpenseCategoriesStatistic,
  loadExpenseCustomersByMonthsStatistic,
  loadExpenseCustomersStatistic,
  loadIncomeCategoriesStatistic,
  loadIncomeCustomersByMonthsStatistic,
  loadIncomeCustomersStatistic,
  loadTotalsByCustomersStatistic,
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

function* handleLoadExpenseCategoriesStatistic(
  { payload: { orgId, query } }: ActionType<typeof loadExpenseCategoriesStatistic.request>,
) {
  try {
    const { statistic } = yield call(getExpenseCategoriesStatistic, orgId, query);
    yield put(loadExpenseCategoriesStatistic.success(orgId, statistic));
  } catch (error) {
    yield put(loadExpenseCategoriesStatistic.failure(error));
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

function* handleLoadTotalsByCustomersStatistic(
  { payload: { orgId, query } }: ActionType<typeof loadTotalsByCustomersStatistic.request>,
) {
  try {
    const { statistic } = yield call(getTotalsByCustomersStatistic, orgId, query);
    yield put(loadTotalsByCustomersStatistic.success(orgId, statistic));
  } catch (error) {
    yield put(loadTotalsByCustomersStatistic.failure(error));
  }
}

function* handleLoadBalancesByCustomersStatistic(
  { payload: { orgId, query } }: ActionType<typeof loadBalancesByCustomersStatistic.request>,
) {
  try {
    const { statistic } = yield call(getBalancesByCustomersStatistic, orgId, query);
    yield put(loadBalancesByCustomersStatistic.success(orgId, statistic));
  } catch (error) {
    yield put(loadBalancesByCustomersStatistic.failure(error));
  }
}

function* handleLoadIncomeCustomersByMonthsStatistic(
  { payload: { orgId, query } }: ActionType<typeof loadIncomeCustomersByMonthsStatistic.request>,
) {
  try {
    const { statistic } = yield call(getIncomeCustomersByMonthsStatistic, orgId, query);
    yield put(loadIncomeCustomersByMonthsStatistic.success(orgId, statistic));
  } catch (error) {
    yield put(loadIncomeCustomersByMonthsStatistic.failure(error));
  }
}

function* handleLoadExpenseCustomersByMonthsStatistic(
  { payload: { orgId, query } }: ActionType<typeof loadExpenseCustomersByMonthsStatistic.request>,
) {
  try {
    const { statistic } = yield call(getExpenseCustomersByMonthsStatistic, orgId, query);
    yield put(loadExpenseCustomersByMonthsStatistic.success(orgId, statistic));
  } catch (error) {
    yield put(loadExpenseCustomersByMonthsStatistic.failure(error));
  }
}

export default function* () {
  yield takeLatest(getType(loadBalanceStatistic.request),                  handleLoadBalanceStatistic);
  yield takeLatest(getType(loadIncomeCategoriesStatistic.request),         handleLoadIncomeCategoriesStatistic);
  yield takeLatest(getType(loadExpenseCategoriesStatistic.request),        handleLoadExpenseCategoriesStatistic);
  yield takeLatest(getType(loadIncomeCustomersStatistic.request),          handleLoadIncomeCustomersStatistic);
  yield takeLatest(getType(loadExpenseCustomersStatistic.request),         handleLoadExpenseCustomersStatistic);
  yield takeLatest(getType(loadTotalsByCustomersStatistic.request),        handleLoadTotalsByCustomersStatistic);
  yield takeLatest(getType(loadBalancesByCustomersStatistic.request),      handleLoadBalancesByCustomersStatistic);
  yield takeLatest(getType(loadIncomeCustomersByMonthsStatistic.request),  handleLoadIncomeCustomersByMonthsStatistic);
  yield takeLatest(getType(loadExpenseCustomersByMonthsStatistic.request), handleLoadExpenseCustomersByMonthsStatistic);
}
