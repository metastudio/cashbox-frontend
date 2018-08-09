import { prepareURL, getApi, postApi, putApi, deleteApi } from 'utils/api-helpers';

const bankAccountsURL        = (orgId) => prepareURL(`/api/organizations/${orgId}/bank_accounts`);
const visibleBankAccountsURL = (orgId) => prepareURL(`/api/organizations/${orgId}/bank_accounts/visible`);
const bankAccountURL = (orgId, bankAccountId) => {
  return prepareURL(`/api/organizations/${orgId}/bank_accounts/${bankAccountId}`);
};

export const getOrganizationBankAccounts = (orgId) => getApi(bankAccountsURL(orgId));
export const getOrganizationVisibleBankAccounts = (orgId) => getApi(visibleBankAccountsURL(orgId));
export const getOrganizationBankAccount = (orgId, bankAccountId) => {
  return getApi(bankAccountURL(orgId, bankAccountId));
};
export const postOrganizationBankAccount = (orgId, data) => {
  return postApi(bankAccountsURL(orgId), { bankAccount: data });
};
export const putOrganizationBankAccount = (orgId, bankAccountId, data) => {
  return putApi(bankAccountURL(orgId, bankAccountId), { bankAccount: data });
};
export const deleteOrganizationBankAccount = (orgId, bankAccountId) => {
  return deleteApi(bankAccountURL(orgId, bankAccountId));
};
