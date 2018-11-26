import { ActionType, getType } from 'typesafe-actions';

import { Status } from 'model-types';

import { setCurrentOrganization } from 'services/organizations/actions';
import {
  loadIncomeCategoriesStatistic,
} from '../actions';
import { IIncomeCategoriesStatisticState } from '../types';

const defaultState: IIncomeCategoriesStatisticState = {
  status: Status.Invalid,
  error:  null,
  data:   null,
};

const incomeCategoriesStatisticReducer = (
  state: IIncomeCategoriesStatisticState = defaultState,
  action: ActionType<
    | typeof loadIncomeCategoriesStatistic
    | typeof setCurrentOrganization
  >,
) => {
  switch (action.type) {
    case getType(loadIncomeCategoriesStatistic.request):
      return {
        ...state,
        status: Status.Pending,
      };
    case getType(loadIncomeCategoriesStatistic.success):
      return {
        ...state,
        status:     Status.Success,
        error:      null,
        data:       action.payload.statistic,
      };
    case getType(loadIncomeCategoriesStatistic.failure):
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

export default incomeCategoriesStatisticReducer;
