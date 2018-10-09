import { ID } from 'model-types';
import { deleteApi, getApi, patchApi, postApi, prepareURL } from 'utils/api-helpers';

const transactionsURL = (orgId: ID, params?: {}) => prepareURL(`/api/organizations/${orgId}/transactions`, params);
const transferURL     = (orgId: ID) => prepareURL(`/api/organizations/${orgId}/transactions/transfer`);
const transactionUrl  = (orgId: ID, transactionId: ID) => {
  return prepareURL(`/api/organizations/${orgId}/transactions/${transactionId}`);
};

export const getOrganizationTransactions   = (orgId: ID, params: {}) =>
  getApi(transactionsURL(orgId, params));
export const getOrganizationTransaction = (orgId: ID, transactionId: ID) =>
  getApi(transactionUrl(orgId, transactionId));
export const postOrganizationTransaction = (orgId: ID, data: {}) =>
  postApi(transactionsURL(orgId), { transaction: data });
export const postOrganizationTransfer = (orgId: ID, data: {}) =>
  postApi(transferURL(orgId), { transfer: data });
export const patchOrganizationTransaction  = (orgId: ID, transactionId: ID, data: {}) =>
  patchApi(transactionUrl(orgId, transactionId), { transaction: data });
export const deleteOrganizationTransaction = (orgId: ID, transactionId: ID) =>
  deleteApi(transactionUrl(orgId, transactionId));
