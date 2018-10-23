import { createAction } from 'typesafe-actions';

import { ID } from 'model-types';
import { IBalanceStatistic } from './types';

const loadBalanceStatistic = {
  request: createAction(
    'LOAD_BALANCE_STATISTIC_REQUEST',
    (resolve) => {
      return (orgId: ID) => resolve({ orgId });
    },
  ),
  success: createAction(
    'LOAD_BALANCE_STATISTIC_SUCCESS',
    (resolve) => {
      return (orgId: ID, statistic: IBalanceStatistic) => resolve({ orgId, statistic });
    },
  ),
  failure: createAction(
    'LOAD_BALANCE_STATISTIC_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

export {
  loadBalanceStatistic,
};
