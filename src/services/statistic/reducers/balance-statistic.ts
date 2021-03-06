import { ActionType, getType } from 'typesafe-actions';

import { Status } from 'model-types';

import { setCurrentOrganization } from 'services/organizations/actions';
import {
  loadBalanceStatistic,
} from '../actions';
import { IBalanceStatisticState } from '../types';

const defaultState: IBalanceStatisticState = {
  status:     Status.Invalid,
  error:      null,
  data:       null,
  pagination: null,
};

const balanceStatisticReducer = (
  state: IBalanceStatisticState = defaultState,
  action: ActionType<
    | typeof loadBalanceStatistic
    | typeof setCurrentOrganization
  >,
) => {
  switch (action.type) {
    case getType(loadBalanceStatistic.request):
      return {
        ...state,
        status: Status.Pending,
      };
    case getType(loadBalanceStatistic.success):
      return {
        ...state,
        status:     Status.Success,
        error:      null,
        data:       action.payload.statistic,
        pagination: action.payload.pagination,
      };
    case getType(loadBalanceStatistic.failure):
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

export default balanceStatisticReducer;
