import { prepareURL, getApi } from './_helpers'

const bankAccountsURL = (orgId) => prepareURL(`/api/organizations/${orgId}/bank_accounts`)

export const getOrganizationBankAccounts = (orgId) => getApi(bankAccountsURL(orgId))
