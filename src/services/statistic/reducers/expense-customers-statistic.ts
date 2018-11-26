import { ActionType, getType } from 'typesafe-actions';

import { Status } from 'model-types';

import { setCurrentOrganization } from 'services/organizations/actions';
import {
  loadExpenseCustomersStatistic,
} from '../actions';
import { IExpenseCustomersStatisticState } from '../types';

const defaultState: IExpenseCustomersStatisticState = {
  status: Status.Invalid,
  error:  null,
  data:   null,
};

const expenseCustomersStatisticReducer = (
  state: IExpenseCustomersStatisticState = defaultState,
  action: ActionType<
    | typeof loadExpenseCustomersStatistic
    | typeof setCurrentOrganization
  >,
) => {
  switch (action.type) {
    case getType(loadExpenseCustomersStatistic.request):
      return {
        ...state,
        status: Status.Pending,
      };
    case getType(loadExpenseCustomersStatistic.success):
      return {
        ...state,
        status:     Status.Success,
        error:      null,
        data:       action.payload.statistic,
      };
    case getType(loadExpenseCustomersStatistic.failure):
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

export default expenseCustomersStatisticReducer;
