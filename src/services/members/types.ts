import { ID } from 'model-types';
import { IUser } from 'services/users/types';

interface IMember {
  id:   ID;
  user: IUser;
  role: string;

}

export { IMember };
