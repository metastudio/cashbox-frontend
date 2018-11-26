import { ActionType, getType } from 'typesafe-actions';

import { Status } from 'model-types';

import { setCurrentOrganization } from 'services/organizations/actions';
import {
  loadIncomeCustomersStatistic,
} from '../actions';
import { IIncomeCustomersStatisticState } from '../types';

const defaultState: IIncomeCustomersStatisticState = {
  status: Status.Invalid,
  error:  null,
  data:   null,
};

const incomeCustomersStatisticReducer = (
  state: IIncomeCustomersStatisticState = defaultState,
  action: ActionType<
    | typeof loadIncomeCustomersStatistic
    | typeof setCurrentOrganization
  >,
) => {
  switch (action.type) {
    case getType(loadIncomeCustomersStatistic.request):
      return {
        ...state,
        status: Status.Pending,
      };
    case getType(loadIncomeCustomersStatistic.success):
      return {
        ...state,
        status:     Status.Success,
        error:      null,
        data:       action.payload.statistic,
      };
    case getType(loadIncomeCustomersStatistic.failure):
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

export default incomeCustomersStatisticReducer;
