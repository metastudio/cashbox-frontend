import { ID } from 'model-types';
import { deleteApi, getApi, prepareURL, putApi } from 'utils/api-helpers';

import { IUserAccountParams, IUserProfileParams } from './types';

const currentUserURL = () => prepareURL('/api/user_info');
const userProfileUrl = (userId: ID) => prepareURL(`/api/users/${userId}/update_profile`);
const userUrl = (userId: ID) => prepareURL(`/api/users/${userId}`);

export const getCurrentUser = () => getApi(currentUserURL());
export const putProfile     = (userId: ID, user: IUserProfileParams) => putApi(userProfileUrl(userId), { user });
export const putUser        = (userId: ID, user: IUserAccountParams) => putApi(userUrl(userId), { user });
export const deleteUser     = (userId: ID) => deleteApi(userUrl(userId));
