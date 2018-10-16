import { ID } from 'model-types';
import { deleteApi, getApi, postApi, prepareURL, putApi } from 'utils/api-helpers';

import { ICategoryParams } from './types';

const categoriesURL = (orgId: ID) => prepareURL(`/api/organizations/${orgId}/categories`);
const categoryURL = (orgId: ID, categoryId: ID) => prepareURL(`/api/organizations/${orgId}/categories/${categoryId}`);

export function getOrganizationCategories(orgId: ID) {
  return getApi(categoriesURL(orgId));
}
export function getOrganizationCategory(orgId: ID, categoryId: ID) {
  return getApi(categoryURL(orgId, categoryId));
}
export function postOrganizationCategory(orgId: ID, data: ICategoryParams) {
  return postApi(categoriesURL(orgId), { category: data });
}
export function putOrganizationCategory(orgId: ID, categoryId: ID, data: ICategoryParams) {
  return putApi(categoryURL(orgId, categoryId), { category: data });
}
export function deleteOrganizationCategory(orgId: ID, categoryId: ID) {
  return deleteApi(categoryURL(orgId, categoryId));
}
