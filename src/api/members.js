import { prepareURL, getApi, putApi } from './_helpers';

const membersUrl       = (orgId) => prepareURL(`/api/organizations/${orgId}/members`);
const organizationUrl  = (orgId) => prepareURL(`/api/organizations/${orgId}`);

export const getOrganizationMembers = (orgId) => getApi(membersUrl(orgId));
export const putMemberLastViewedAt  = (orgId) => putApi(`${organizationUrl(orgId)}/last_visit`);
