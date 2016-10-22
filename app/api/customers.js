import { prepareURL, getApi } from './_helpers'

const customersURL = (orgId) => prepareURL(`/api/organizations/${orgId}/customers`)

export const getOrganizationCustomers = (orgId) => getApi(customersURL(orgId))
