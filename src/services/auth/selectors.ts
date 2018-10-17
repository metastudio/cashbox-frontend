import { IAuthState } from './types';

function selectIsAuthorized(state: { auth: IAuthState }): boolean {
  return !!state.auth.token;
}

export { selectIsAuthorized };
