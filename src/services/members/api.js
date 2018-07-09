import { prepareURL, getApi, putApi } from 'api/_helpers.js';

const membersUrl               = (orgId) => prepareURL(`/api/organizations/${orgId}/members`);
const organizationLastVisitUrl = (orgId) => prepareURL(`/api/organizations/${orgId}/last_visit`);

export const getOrganizationMembers = (orgId) => getApi(membersUrl(orgId));
export const putMemberLastVisit     = (orgId) => putApi(organizationLastVisitUrl(orgId));
