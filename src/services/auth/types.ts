import { IUser } from '../users/types';

interface IAuthState {
  token: string | null;
  user:  IUser  | null;
}

export { IAuthState };
