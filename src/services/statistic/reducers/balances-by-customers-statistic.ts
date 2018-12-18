import { ActionType, getType } from 'typesafe-actions';

import { Status } from 'model-types';

import { setCurrentOrganization } from 'services/organizations/actions';
import {
  loadBalancesByCustomersStatistic,
} from '../actions';
import { IBalancesByCustomersStatisticState } from '../types';

const defaultState: IBalancesByCustomersStatisticState = {
  status: Status.Invalid,
  error:  null,
  data:   null,
};

const balancesByCustomersStatisticReducer = (
  state: IBalancesByCustomersStatisticState = defaultState,
  action: ActionType<
    | typeof loadBalancesByCustomersStatistic
    | typeof setCurrentOrganization
  >,
) => {
  switch (action.type) {
    case getType(loadBalancesByCustomersStatistic.request):
      return {
        ...state,
        status: Status.Pending,
      };
    case getType(loadBalancesByCustomersStatistic.success):
      return {
        ...state,
        status:     Status.Success,
        error:      null,
        data:       action.payload.statistic,
      };
    case getType(loadBalancesByCustomersStatistic.failure):
      return {
        ...state,
        status: Status.Failure,
        error:  action.payload,
      };
    case String(setCurrentOrganization.success):
      return {
        ...state,
        ...defaultState,
      };
    default:
      return state;
  }
};

export default balancesByCustomersStatisticReducer;
