import { ActionType, getType } from 'typesafe-actions';

import { Status } from 'model-types';
import { setCurrentOrganization } from 'services/organizations/actions';

import { loadCategory } from '../actions';
import { ICategoryState } from '../types';

const defaultState: ICategoryState = {
  data:   null,
  status: Status.Invalid,
  error:  null,
};

function categoryReducer(
  state: ICategoryState = defaultState,
  action: ActionType<
    | typeof loadCategory
    | typeof setCurrentOrganization.success
  >,
): ICategoryState {
  switch (action.type) {
    case getType(loadCategory.request):
      return {
        ...state,
        status: Status.Pending,
        error:  null,
      };
    case getType(loadCategory.success):
      return {
        ...state,
        data:   action.payload.category,
        status: Status.Success,
        error:  null,
      };
    case getType(loadCategory.failure):
      return {
        ...state,
        status: Status.Failure,
        error:  action.payload,
      };
    case getType(setCurrentOrganization.success):
      return {
        ...state,
        ...defaultState,
      };
    default:
      return state;
  }
}

export default categoryReducer;
