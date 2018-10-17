import { ID } from 'model-types';
import { getApi, prepareURL, putApi } from 'utils/api-helpers';

const membersUrl               = (orgId: ID) => prepareURL(`/api/organizations/${orgId}/members`);
const organizationLastVisitUrl = (orgId: ID) => prepareURL(`/api/organizations/${orgId}/last_visit`);

export const getOrganizationMembers = (orgId: ID) => getApi(membersUrl(orgId));
export const putMemberLastVisit     = (orgId: ID) => putApi(organizationLastVisitUrl(orgId));
