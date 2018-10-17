import { createAction } from 'typesafe-actions';

import { ID } from 'model-types';
import { IOrganizationBalance } from './types';

const loadOrganizationBalances = {
  request: createAction(
    'LOAD_ORGANIZATION_BALANCES_REQUEST',
    (resolve) => {
      return (orgId: ID) => resolve({ orgId });
    },
  ),
  success: createAction(
    'LOAD_ORGANIZATION_BALANCES_SUCCESS',
    (resolve) => {
      return (orgId: ID, orgBalance: IOrganizationBalance) => resolve({ orgId, orgBalance });
    },
  ),
  failure: createAction(
    'LOAD_ORGANIZATION_BALANCES_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

export {
  loadOrganizationBalances,
};
