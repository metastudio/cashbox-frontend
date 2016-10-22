import { prepareURL, getApi, postApi } from './_helpers'

const transactionsURL = (orgId) => prepareURL(`/api/organizations/${orgId}/transactions`)

export const getOrganizationTransactions = (orgId) => getApi(transactionsURL(orgId))
export const postOrganizationTransaction = (orgId, data) => postApi(transactionsURL(orgId), { transaction: data })
