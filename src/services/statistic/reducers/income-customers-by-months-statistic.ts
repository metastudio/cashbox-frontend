import { ActionType, getType } from 'typesafe-actions';

import { Status } from 'model-types';

import { setCurrentOrganization } from 'services/organizations/actions';
import {
  loadIncomeCustomersByMonthsStatistic,
} from '../actions';
import { IIncomeCustomersByMonthsStatisticState } from '../types';

const defaultState: IIncomeCustomersByMonthsStatisticState = {
  status: Status.Invalid,
  error:  null,
  data:   null,
};

const incomeCustomersByMonthsStatisticReducer = (
  state: IIncomeCustomersByMonthsStatisticState = defaultState,
  action: ActionType<
    | typeof loadIncomeCustomersByMonthsStatistic
    | typeof setCurrentOrganization
  >,
) => {
  switch (action.type) {
    case getType(loadIncomeCustomersByMonthsStatistic.request):
      return {
        ...state,
        status: Status.Pending,
      };
    case getType(loadIncomeCustomersByMonthsStatistic.success):
      return {
        ...state,
        status:     Status.Success,
        error:      null,
        data:       action.payload.statistic,
      };
    case getType(loadIncomeCustomersByMonthsStatistic.failure):
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

export default incomeCustomersByMonthsStatisticReducer;
