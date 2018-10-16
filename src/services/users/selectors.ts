import { ID } from 'model-types';
import { IAuthState } from 'services/auth/types';

import { IUser } from './types';

interface IStateWithAuth {
  auth: IAuthState;
}

function selectCurrentUser(state: IStateWithAuth): IUser | null {
  return state.auth.user;
}
function selectUserFullName(state: IStateWithAuth): string | null {
  return state.auth.user && state.auth.user.fullName;
}
function selectCurrentUserId(state: IStateWithAuth): ID | null {
  return state.auth.user && state.auth.user.id;
}

export {
  selectCurrentUser,
  selectCurrentUserId,
  selectUserFullName,
};
