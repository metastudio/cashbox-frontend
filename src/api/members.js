import { prepareURL, getApi, putApi } from './_helpers';

const membersUrl       = (orgId) => prepareURL(`/api/organizations/${orgId}/members`);
const memberUrl        = (orgId, memberId) => prepareURL(`/api/organizations/${orgId}/members/${memberId}`);
const currentMemberUrl = (orgId) => prepareURL(`/api/organizations/${orgId}/member_info`);

export const getOrganizationMembers   = (orgId) => getApi(membersUrl(orgId));
export const getCurrentMember         = (orgId) => getApi(currentMemberUrl(orgId));
export const putMemberLastViewedAt    = (orgId, memberId) => putApi(memberUrl(orgId, memberId) + '/update_last_viewed_at');
