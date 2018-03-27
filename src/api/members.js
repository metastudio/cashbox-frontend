import { prepareURL, getApi } from './_helpers'

const membersURL = (orgId) => prepareURL(`/api/organizations/${orgId}/members`)
const memberURL = (orgId, memberId) => prepareURL(`/api/organizations/${orgId}/members/${memberId}`)

export const getOrganizationMembers = (orgId) => getApi(membersURL(orgId))
