import { prepareURL, getApi } from './_helpers'

const categoriesURL = (orgId) => prepareURL(`/api/organizations/${orgId}/categories`)

export const getOrganizationCategories = (orgId) => getApi(categoriesURL(orgId))
