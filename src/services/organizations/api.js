import { prepareURL, getApi, postApi, putApi, deleteApi } from 'utils/api-helpers';

const organizationsURL = ()   => prepareURL('/api/organizations');
const organizationURL  = (id) => prepareURL(`/api/organizations/${id}`);

export const getOrganizations   = ()         => getApi(organizationsURL());
export const postOrganization   = (data)     => postApi(organizationsURL(), { organization: data });
export const getOrganization    = (id)       => getApi(organizationURL(id));
export const putOrganization    = (id, data) => putApi(organizationURL(id), { organization: data });
export const deleteOrganization = (id)       => deleteApi(organizationURL(id));
