import { createAction } from 'typesafe-actions';

import { ID } from 'model-types';
import { IMoney } from 'utils/money';

import { IDebtor, ITotalByCurrency } from './types';

const loadDebtors = {
  request: createAction(
    'LOAD_DEBTORS_REQUEST',
    (resolve) => {
      return (orgId: ID) => resolve({ orgId });
    },
  ),
  success: createAction(
    'LOAD_DEBTORS_SUCCESS',
    (resolve) => {
      return (
        orgId:            ID,
        debtors:          IDebtor[],
        total:            IMoney,
        totalsByCurrency: ITotalByCurrency[],
      ) => resolve(
        { orgId, debtors, total, totalsByCurrency },
      );
    },
  ),
  failure: createAction(
    'LOAD_DEBTORS_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

export { loadDebtors };
