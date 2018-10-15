import { ActionType, getType } from 'typesafe-actions';

import { Status } from 'model-types';

import { setCurrentOrganization } from 'services/organizations/actions';
import {
  loadTransactionsSummary,
} from '../actions';
import { ITransactionsSummaryState } from '../types';

const defaultState: ITransactionsSummaryState = {
  status:  Status.Invalid,
  error:   null,
  summary: null,
};

const transactionsSummaryReducer = (
  state: ITransactionsSummaryState = defaultState,
  action: ActionType<
    | typeof loadTransactionsSummary
    | typeof setCurrentOrganization
  >,
) => {
  switch (action.type) {
    case getType(loadTransactionsSummary.request):
      return {
        ...state,
        status: Status.Pending,
      };
    case getType(loadTransactionsSummary.success):
      return {
        ...state,
        status:  Status.Success,
        error:   null,
        summary: action.payload.summary,
      };
    case getType(loadTransactionsSummary.failure):
      return {
        ...state,
        status:  Status.Failure,
        error:   action.payload,
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

export default transactionsSummaryReducer;
