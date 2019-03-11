import { ActionType, getType } from 'typesafe-actions';

import { Status } from 'model-types';

import { setCurrentOrganization } from 'services/organizations/actions';
import {
  loadExpenseCustomersByMonthsStatistic,
} from '../actions';
import { IExpenseCustomersByMonthsStatisticState } from '../types';

const defaultState: IExpenseCustomersByMonthsStatisticState = {
  status: Status.Invalid,
  error:  null,
  data:   null,
};

const expenseCustomersByMonthsStatisticReducer = (
  state: IExpenseCustomersByMonthsStatisticState = defaultState,
  action: ActionType<
    | typeof loadExpenseCustomersByMonthsStatistic
    | typeof setCurrentOrganization
  >,
) => {
  switch (action.type) {
    case getType(loadExpenseCustomersByMonthsStatistic.request):
      return {
        ...state,
        status: Status.Pending,
      };
    case getType(loadExpenseCustomersByMonthsStatistic.success):
      return {
        ...state,
        status:     Status.Success,
        error:      null,
        data:       action.payload.statistic,
      };
    case getType(loadExpenseCustomersByMonthsStatistic.failure):
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

export default expenseCustomersByMonthsStatisticReducer;
