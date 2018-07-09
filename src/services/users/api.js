import { prepareURL, getApi, putApi, deleteApi } from 'utils/api-helpers';

const currentUserURL = () => prepareURL('/api/user_info');
const updateProfileUrl = (userId) => prepareURL(`/api/users/${userId}/update_profile`);
const updateAccountUrl = (userId) => prepareURL(`/api/users/${userId}`);

export const getCurrentUser = () => getApi(currentUserURL());
export const updateProfile = (userId, user) => putApi(updateProfileUrl(userId), { user });
export const updateAccount = (userId, user) => putApi(updateAccountUrl(userId), { user });
export const cancelAccount = (userId) => deleteApi(updateAccountUrl(userId));
