import { createAction } from 'redux-actions';

export const loadMembers = createAction('LOAD_MEMBERS', (organizationId) => ({ organizationId }));
loadMembers.request = createAction('LOAD_MEMBERS_REQUEST', (organizationId) => ({ organizationId }));
loadMembers.success = createAction('LOAD_MEMBERS_SUCCESS', (organizationId, members) => ({ organizationId, members }));
loadMembers.failure = createAction('LOAD_MEMBERS_FAILURE');
