import { ID, Status } from 'model-types';
import { IUser } from 'services/users/types';

interface IMember {
  id:   ID;
  user: IUser;
  role: string;
}

interface IMembersState {
  status: Status;
  items:  IMember[];
  error:  Error | null;
}

export {
  IMember,
  IMembersState,
};
