import { ActionType, getType } from 'typesafe-actions';

import { Status } from 'model-types';

import { setCurrentOrganization } from 'services/organizations/actions';
import {
  loadExpenseCategoriesStatistic,
} from '../actions';
import { IExpenseCategoriesStatisticState } from '../types';

const defaultState: IExpenseCategoriesStatisticState = {
  status: Status.Invalid,
  error:  null,
  data:   null,
};

const expenseCategoriesStatisticReducer = (
  state: IExpenseCategoriesStatisticState = defaultState,
  action: ActionType<
    | typeof loadExpenseCategoriesStatistic
    | typeof setCurrentOrganization
  >,
) => {
  switch (action.type) {
    case getType(loadExpenseCategoriesStatistic.request):
      return {
        ...state,
        status: Status.Pending,
      };
    case getType(loadExpenseCategoriesStatistic.success):
      return {
        ...state,
        status: Status.Success,
        error:  null,
        data:   action.payload.statistic,
      };
    case getType(loadExpenseCategoriesStatistic.failure):
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

export default expenseCategoriesStatisticReducer;
