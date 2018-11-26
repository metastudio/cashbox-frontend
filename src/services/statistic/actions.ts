import { createAction } from 'typesafe-actions';

import { ID, IPagination } from 'model-types';
import { IBalanceStatistic, IIncomeCategoriesStatistic } from './types';

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
        statistic: IIncomeCategoriesStatistic,
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

export {
  loadBalanceStatistic,
  loadIncomeCategoriesStatistic,
};
