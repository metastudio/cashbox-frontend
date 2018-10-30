import { ID } from 'model-types';
import { deleteApi, getApi, postApi, prepareURL, putApi } from 'utils/api-helpers';

const organizationsURL = ()   => prepareURL('/api/organizations');
const organizationURL  = (id: ID) => prepareURL(`/api/organizations/${id}`);

export const getOrganizations   = ()                 => getApi(organizationsURL());
export const postOrganization   = (data: {})         => postApi(organizationsURL(), { organization: data });
export const getOrganization    = (id: ID)           => getApi(organizationURL(id));
export const putOrganization    = (id: ID, data: {}) => putApi(organizationURL(id), { organization: data });
export const deleteOrganization = (id: ID)           => deleteApi(organizationURL(id));
