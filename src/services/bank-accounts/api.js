import { prepareURL, getApi, postApi, putApi, deleteApi } from 'utils/api-helpers';

const bankAccountsURL        = (orgId) => prepareURL(`/api/organizations/${orgId}/bank_accounts`);
const visibleBankAccountsURL = (orgId) => prepareURL(`/api/organizations/${orgId}/bank_accounts/visible`);
const bankAccountURL         = (orgId, bankAccountId) => prepareURL(`/api/organizations/${orgId}/bank_accounts/${bankAccountId}`);

export const getOrganizationBankAccounts        = (orgId) => getApi(bankAccountsURL(orgId));
export const getOrganizationVisibleBankAccounts = (orgId) => getApi(visibleBankAccountsURL(orgId));
export const getOrganizationBankAccount         = (orgId, bankAccountId) => getApi(bankAccountURL(orgId, bankAccountId));
export const postOrganizationBankAccount        = (orgId, data) => postApi(bankAccountsURL(orgId), { bankAccount: data });
export const putOrganizationBankAccount         = (orgId, bankAccountId, data) => putApi(bankAccountURL(orgId, bankAccountId), { bankAccount: data });
export const deleteOrganizationBankAccount      = (orgId, bankAccountId) => deleteApi(bankAccountURL(orgId, bankAccountId));
