import { prepareURL, getApi, postApi, putApi, deleteApi } from './_helpers';

const categoriesURL = (orgId) => prepareURL(`/api/organizations/${orgId}/categories`);
const categoryURL = (orgId, categoryId) => prepareURL(`/api/organizations/${orgId}/categories/${categoryId}`);

export const getOrganizationCategories  = (orgId) => getApi(categoriesURL(orgId));
export const getOrganizationCategory    = (orgId, categoryId) => getApi(categoryURL(orgId, categoryId));
export const postOrganizationCategory   = (orgId, data) => postApi(categoriesURL(orgId), { category: data });
export const putOrganizationCategory    = (orgId, categoryId, data) => putApi(categoryURL(orgId, categoryId), { category: data });
export const deleteOrganizationCategory = (orgId, categoryId) => deleteApi(categoryURL(orgId, categoryId));
