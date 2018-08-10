import { prepareURL, getApi, postApi, putApi, deleteApi } from 'utils/api-helpers';

const customersURL = (orgId) => prepareURL(`/api/organizations/${orgId}/customers`);
const customerURL = (orgId, customerId) => prepareURL(`/api/organizations/${orgId}/customers/${customerId}`);

export const getOrganizationCustomers   = (orgId) => getApi(customersURL(orgId));
export const getOrganizationCustomer    = (orgId, customerId) => getApi(customerURL(orgId, customerId));
export const postOrganizationCustomer   = (orgId, data) => postApi(customersURL(orgId), { customer: data });
export const putOrganizationCustomer = (orgId, customerId, data) => {
  return putApi(customerURL(orgId, customerId), { customer: data });
};
export const deleteOrganizationCustomer = (orgId, customerId) => deleteApi(customerURL(orgId, customerId));
