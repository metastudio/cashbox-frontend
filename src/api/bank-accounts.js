import { prepareURL, getApi, postApi, putApi, deleteApi } from './_helpers';

const bankAccountsURL = (orgId) => prepareURL(`/api/organizations/${orgId}/bank_accounts`);
const bankAccountURL  = (orgId, bankAccountId) => prepareURL(`/api/organizations/${orgId}/bank_accounts/${bankAccountId}`);

export const getOrganizationBankAccounts   = (orgId) => getApi(bankAccountsURL(orgId));
export const getOrganizationBankAccount    = (orgId, bankAccountId) => getApi(bankAccountURL(orgId, bankAccountId));
export const postOrganizationBankAccount   = (orgId, data) => postApi(bankAccountsURL(orgId), { bankAccount: data });
export const putOrganizationBankAccount    = (orgId, bankAccountId, data) => putApi(bankAccountURL(orgId, bankAccountId), { bankAccount: data });
export const deleteOrganizationBankAccount = (orgId, bankAccountId) => deleteApi(bankAccountURL(orgId, bankAccountId));
