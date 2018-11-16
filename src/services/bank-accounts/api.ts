import { ID } from 'model-types';
import { deleteApi, getApi, postApi, prepareURL, putApi } from 'utils/api-helpers';

import { IBankAccountParams } from './types';

const bankAccountsURL        = (orgId: ID) => prepareURL(`/api/organizations/${orgId}/bank_accounts`);
const visibleBankAccountsURL = (orgId: ID) => prepareURL(`/api/organizations/${orgId}/bank_accounts/visible`);
const bankAccountURL = (orgId: ID, bankAccountId: ID) => {
  return prepareURL(`/api/organizations/${orgId}/bank_accounts/${bankAccountId}`);
};
const sortBankAccountsURL = (orgId: ID, bankAccountId: ID) => {
  return prepareURL(`/api/organizations/${orgId}/bank_accounts/${bankAccountId}/sort`);
};

export const getOrganizationBankAccounts = (orgId: ID) => getApi(bankAccountsURL(orgId));
export const getOrganizationVisibleBankAccounts = (orgId: ID) => getApi(visibleBankAccountsURL(orgId));
export const getOrganizationBankAccount = (orgId: ID, bankAccountId: ID) => {
  return getApi(bankAccountURL(orgId, bankAccountId));
};
export const postOrganizationBankAccount = (orgId: ID, data: IBankAccountParams) => {
  return postApi(bankAccountsURL(orgId), { bankAccount: data });
};
export const putOrganizationBankAccount = (orgId: ID, bankAccountId: ID, data: IBankAccountParams) => {
  return putApi(bankAccountURL(orgId, bankAccountId), { bankAccount: data });
};
export const putOrganizationSortBankAccounts = (orgId: ID, bankAccountId: ID, data: IBankAccountParams) => {
  return putApi(sortBankAccountsURL(orgId, bankAccountId), { bankAccount: data });
};
export const deleteOrganizationBankAccount = (orgId: ID, bankAccountId: ID) => {
  return deleteApi(bankAccountURL(orgId, bankAccountId));
};
