import { prepareURL, getApi, postApi, patchApi } from './_helpers';

const transactionsURL = (orgId) => prepareURL(`/api/organizations/${orgId}/transactions`);
const transferURL     = (orgId) => prepareURL(`/api/organizations/${orgId}/transactions/transfer`);
const transactionUrl  = (orgId, transactionId) => prepareURL(`/api/organizations/${orgId}/transactions/${transactionId}`);

export const getOrganizationTransactions  = (orgId) => getApi(transactionsURL(orgId));
export const getOrganizationTransaction   = (orgId, transactionId) => getApi(transactionUrl(orgId, transactionId));
export const postOrganizationTransaction  = (orgId, data) => postApi(transactionsURL(orgId), { transaction: data });
export const postOrganizationTransfer     = (orgId, data) => postApi(transferURL(orgId), { transfer: data });
export const patchOrganizationTransaction = (orgId, transactionId, data) => patchApi(transactionUrl(orgId, transactionId), { transaction: data });
