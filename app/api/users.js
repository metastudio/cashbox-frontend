import { prepareURL, getApi } from './_helpers'

const currentUserURL = () => prepareURL('/api/user_info')

export const getCurrentUser = () => getApi(currentUserURL())
