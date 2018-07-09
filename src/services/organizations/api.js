import { prepareURL, getApi, postApi } from 'api/_helpers.js';

const organizationsURL = ()   => prepareURL('/api/organizations');
const organizationURL  = (id) => prepareURL(`/api/organizations/${id}`);

export const getOrganizations = () => getApi(organizationsURL());
export const postOrganization = (data) => postApi(organizationsURL(), { organization: data });
export const getOrganization  = (id) => getApi(organizationURL(id));
