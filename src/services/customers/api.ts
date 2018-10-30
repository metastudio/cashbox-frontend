import { ID } from 'model-types';
import { deleteApi, getApi, postApi, prepareURL, putApi } from 'utils/api-helpers';

import { ICustomerParams } from './types';

const customersURL = (orgId: ID) => prepareURL(`/api/organizations/${orgId}/customers`);
const customerURL = (orgId: ID, customerId: ID) => prepareURL(`/api/organizations/${orgId}/customers/${customerId}`);

export function getOrganizationCustomers(orgId: ID) {
  return getApi(customersURL(orgId));
}
export function getOrganizationCustomer(orgId: ID, customerId: ID) {
  return getApi(customerURL(orgId, customerId));
}
export function postOrganizationCustomer(orgId: ID, data: ICustomerParams) {
  return postApi(customersURL(orgId), { customer: data });
}
export function putOrganizationCustomer(orgId: ID, customerId: ID, data: ICustomerParams) {
  return putApi(customerURL(orgId, customerId), { customer: data });
}
export function deleteOrganizationCustomer(orgId: ID, customerId: ID) {
  return deleteApi(customerURL(orgId, customerId));
}
