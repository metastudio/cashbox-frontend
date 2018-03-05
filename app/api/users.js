import { prepareURL, getApi, putApi, deleteApi } from './_helpers'

const currentUserURL = () => prepareURL('/api/user_info')
const updateProfileUrl = (userId) => prepareURL(`/api/users/${userId}/update_profile`)
const updateAccountUrl = (userId) => prepareURL(`/api/users/${userId}`)

export const getCurrentUser = () => getApi(currentUserURL())
export const updateProfile = (userId, params) => putApi(updateProfileUrl(userId), {
  'user': params
})
export const updateAccount = (userId, params) => putApi(updateAccountUrl(userId), {
  'user': params
})

export const cancelAccount = (userId) => deleteApi(updateAccountUrl(userId))