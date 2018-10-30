import { ActionType, getType } from 'typesafe-actions';

import { Status } from 'model-types';
import { setCurrentOrganization } from 'services/organizations/actions';

import { loadMembers } from '../actions';
import { IMembersState } from '../types';

const defaultState: IMembersState = {
  items:  [],
  status: Status.Invalid,
  error:  null,
};

function membersReducer(
  state: IMembersState = defaultState,
  action: ActionType<
    | typeof loadMembers
    | typeof setCurrentOrganization.success
  >,
): IMembersState {
  switch (action.type) {
    case getType(loadMembers.request):
      return {
        ...state,
        status: Status.Pending,
        error:  null,
      };
    case getType(loadMembers.success):
      return {
        ...state,
        status: Status.Success,
        items:  action.payload.members,
        error:  null,
      };
    case getType(loadMembers.failure):
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

export default membersReducer;
