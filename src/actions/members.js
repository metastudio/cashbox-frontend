import { createAction } from 'redux-actions'
import { noop } from 'lodash'

export const loadMembers = createAction('LOAD_MEMBERS', (organizationId) => ({ organizationId }))
loadMembers.request = createAction('LOAD_MEMBERS_REQUEST', (organizationId) => ({ organizationId }))
loadMembers.success = createAction('LOAD_MEMBERS_SUCCESS', (organizationId, members) => ({ organizationId, members }))
loadMembers.failure = createAction('LOAD_MEMBERS_FAILURE')
