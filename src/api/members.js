import { prepareURL, getApi } from './_helpers';

const membersURL = (orgId) => prepareURL(`/api/organizations/${orgId}/members`);

export const getOrganizationMembers = (orgId) => getApi(membersURL(orgId));
