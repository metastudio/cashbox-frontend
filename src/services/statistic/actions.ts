import { createAction } from 'typesafe-actions';

import { ID, IPagination } from 'model-types';
import {
  IBalanceStatistic,
  ICategoriesStatistic,
  ICustomersBalancesStatistic,
  ICustomersStatistic,
} from './types';

const loadBalanceStatistic = {
  request: createAction(
    'LOAD_BALANCE_STATISTIC_REQUEST',
    (resolve) => {
      return (orgId: ID, query: {}) => resolve({ orgId, query });
    },
  ),
  success: createAction(
    'LOAD_BALANCE_STATISTIC_SUCCESS',
    (resolve) => {
      return (
        orgId:     ID,
        statistic: IBalanceStatistic,
        pagination: IPagination,
      ) => resolve(
        { orgId, statistic, pagination },
      );
    },
  ),
  failure: createAction(
    'LOAD_BALANCE_STATISTIC_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

const loadIncomeCategoriesStatistic = {
  request: createAction(
    'LOAD_INCOME_CATEGORIES_STATISTIC_REQUEST',
    (resolve) => {
      return (orgId: ID, query: {}) => resolve({ orgId, query });
    },
  ),
  success: createAction(
    'LOAD_INCOME_CATEGORIES_STATISTIC_SUCCESS',
    (resolve) => {
      return (
        orgId:     ID,
        statistic: ICategoriesStatistic,
      ) => resolve(
        { orgId, statistic },
      );
    },
  ),
  failure: createAction(
    'LOAD_INCOME_CATEGORIES_STATISTIC_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

const loadExpenseCategoriesStatistic = {
  request: createAction(
    'LOAD_EXPENSE_CATEGORIES_STATISTIC_REQUEST',
    (resolve) => {
      return (orgId: ID, query: {}) => resolve({ orgId, query });
    },
  ),
  success: createAction(
    'LOAD_EXPENSE_CATEGORIES_STATISTIC_SUCCESS',
    (resolve) => {
      return (
        orgId:     ID,
        statistic: ICategoriesStatistic,
      ) => resolve(
        { orgId, statistic },
      );
    },
  ),
  failure: createAction(
    'LOAD_EXPENSE_CATEGORIES_STATISTIC_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

const loadIncomeCustomersStatistic = {
  request: createAction(
    'LOAD_INCOME_CUSTOMERS_STATISTIC_REQUEST',
    (resolve) => {
      return (orgId: ID, query: {}) => resolve({ orgId, query });
    },
  ),
  success: createAction(
    'LOAD_INCOME_CUSTOMERS_STATISTIC_SUCCESS',
    (resolve) => {
      return (
        orgId:     ID,
        statistic: ICustomersStatistic,
      ) => resolve(
        { orgId, statistic },
      );
    },
  ),
  failure: createAction(
    'LOAD_INCOME_CUSTOMERS_STATISTIC_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

const loadExpenseCustomersStatistic = {
  request: createAction(
    'LOAD_EXPENSE_CUSTOMERS_STATISTIC_REQUEST',
    (resolve) => {
      return (orgId: ID, query: {}) => resolve({ orgId, query });
    },
  ),
  success: createAction(
    'LOAD_EXPENSE_CUSTOMERS_STATISTIC_SUCCESS',
    (resolve) => {
      return (
        orgId:     ID,
        statistic: ICustomersStatistic,
      ) => resolve(
        { orgId, statistic },
      );
    },
  ),
  failure: createAction(
    'LOAD_EXPENSE_CUSTOMERS_STATISTIC_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

const loadTotalsByCustomersStatistic = {
  request: createAction(
    'LOAD_TOTALS_BY_CUSTOMERS_STATISTIC_REQUEST',
    (resolve) => {
      return (orgId: ID, query: {}) => resolve({ orgId, query });
    },
  ),
  success: createAction(
    'LOAD_TOTALS_BY_CUSTOMERS_STATISTIC_SUCCESS',
    (resolve) => {
      return (
        orgId:     ID,
        statistic: ICustomersStatistic,
      ) => resolve(
        { orgId, statistic },
      );
    },
  ),
  failure: createAction(
    'LOAD_TOTALS_BY_CUSTOMERS_STATISTIC_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

const loadBalancesByCustomersStatistic = {
  request: createAction(
    'LOAD_BALANCES_BY_CUSTOMERS_STATISTIC_REQUEST',
    (resolve) => {
      return (orgId: ID, query: {}) => resolve({ orgId, query });
    },
  ),
  success: createAction(
    'LOAD_BALANCES_BY_CUSTOMERS_STATISTIC_SUCCESS',
    (resolve) => {
      return (
        orgId:     ID,
        statistic: ICustomersBalancesStatistic,
      ) => resolve(
        { orgId, statistic },
      );
    },
  ),
  failure: createAction(
    'LOAD_BALANCES_BY_CUSTOMERS_STATISTIC_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

export {
  loadBalanceStatistic,
  loadIncomeCategoriesStatistic,
  loadExpenseCategoriesStatistic,
  loadIncomeCustomersStatistic,
  loadExpenseCustomersStatistic,
  loadTotalsByCustomersStatistic,
  loadBalancesByCustomersStatistic,
};
