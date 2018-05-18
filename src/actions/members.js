import { createAction } from 'redux-actions';

export const loadMembers = createAction('LOAD_MEMBERS', (organizationId) => ({ organizationId }));
loadMembers.request = createAction('LOAD_MEMBERS_REQUEST', (organizationId) => ({ organizationId }));
loadMembers.success = createAction('LOAD_MEMBERS_SUCCESS', (organizationId, members) => ({ organizationId, members }));
loadMembers.failure = createAction('LOAD_MEMBERS_FAILURE');

export const loadCurrentMember = createAction('LOAD_CURRENT_MEMBER', (organizationId) => ({ organizationId }));
loadCurrentMember.request = createAction('LOAD_CURRENT_MEMBER_REQUEST', (organizationId) => ({ organizationId }));
loadCurrentMember.success = createAction('LOAD_CURRENT_MEMBER_SUCCESS', (organizationId, member) => ({ organizationId, member }));
loadCurrentMember.failure = createAction('LOAD_CURRENT_MEMBER_FAILURE');

export const clearCurrentMember = createAction('CLEAR_CURRENT_MEMBER');
