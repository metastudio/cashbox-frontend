import { ActionType, getType } from 'typesafe-actions';

import { Status } from 'model-types';

import { setCurrentOrganization } from 'services/organizations/actions';
import {
  loadTotalsByCustomersStatistic,
} from '../actions';
import { ITotalsByCustomersStatisticState } from '../types';

const defaultState: ITotalsByCustomersStatisticState = {
  status: Status.Invalid,
  error:  null,
  data:   null,
};

const totalsByCustomersStatisticReducer = (
  state: ITotalsByCustomersStatisticState = defaultState,
  action: ActionType<
    | typeof loadTotalsByCustomersStatistic
    | typeof setCurrentOrganization
  >,
) => {
  switch (action.type) {
    case getType(loadTotalsByCustomersStatistic.request):
      return {
        ...state,
        status: Status.Pending,
      };
    case getType(loadTotalsByCustomersStatistic.success):
      return {
        ...state,
        status:     Status.Success,
        error:      null,
        data:       action.payload.statistic,
      };
    case getType(loadTotalsByCustomersStatistic.failure):
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

export default totalsByCustomersStatisticReducer;
