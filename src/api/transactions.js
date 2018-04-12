import { prepareURL, getApi, postApi } from './_helpers';

const transactionsURL = (orgId) => prepareURL(`/api/organizations/${orgId}/transactions`);
const transferURL = (orgId) => prepareURL(`/api/organizations/${orgId}/transactions/transfer`);

export const getOrganizationTransactions = (orgId) => getApi(transactionsURL(orgId));
export const postOrganizationTransaction = (orgId, data) => postApi(transactionsURL(orgId), { transaction: data });
export const postOrganizationTransfer    = (orgId, data) => postApi(transferURL(orgId), { transfer: data });
