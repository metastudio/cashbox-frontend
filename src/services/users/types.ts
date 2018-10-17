import { ID } from 'model-types';

interface IUser {
  id:           ID;
  fullName:     string;
  email:        string;
  phoneNumber?: string;
}

interface IUserAccountParams {
  email?:                string;
  currentPassword?:      string;
  password?:             string;
  passwordConfirmation?: string;
}

interface IUserProfileParams {
  fullName?:          string;
  profileAttributes?: {
    phoneNumber?: string;
  };
}

export {
  IUser,
  IUserAccountParams,
  IUserProfileParams,
};
