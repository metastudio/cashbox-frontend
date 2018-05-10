import { createAction } from 'redux-actions';
import { noop } from 'lodash';

export const loadMembers = createAction('LOAD_MEMBERS', (organizationId) => ({ organizationId }));
loadMembers.request = createAction('LOAD_MEMBERS_REQUEST', (organizationId) => ({ organizationId }));
loadMembers.success = createAction('LOAD_MEMBERS_SUCCESS', (organizationId, members) => ({ organizationId, members }));
loadMembers.failure = createAction('LOAD_MEMBERS_FAILURE');

export const loadCurrentMember = createAction('LOAD_CURRENT_MEMBER', (organizationId) => ({ organizationId }));
loadCurrentMember.request = createAction('LOAD_CURRENT_MEMBER_REQUEST', (organizationId) => ({ organizationId }));
loadCurrentMember.success = createAction('LOAD_CURRENT_MEMBER_SUCCESS', (organizationId, member) => ({ organizationId, member }));
loadCurrentMember.failure = createAction('LOAD_CURRENT_MEMBER_FAILURE');

export const updateMemberLastViewedAt = createAction('UPDATE_MEMBER_LAST_VIEWED_AT', (organizationId, memberId) => ({ organizationId, memberId }),
  (_organizationId, _memberId, resolve = noop, reject = noop) => ({ resolve, reject }));
updateMemberLastViewedAt.request = createAction('UPDATE_MEMBER_LAST_VIEWED_AT_REQUEST', (organizationId, memberId) => ({ organizationId, memberId }));
updateMemberLastViewedAt.success = createAction('UPDATE_MEMBER_LAST_VIEWED_AT_SUCCESS', (organizationId, memberId, member) => ({ organizationId, memberId, member }));
updateMemberLastViewedAt.failure = createAction('UPDATE_MEMBER_LAST_VIEWED_AT_FAILURE');

export const clearCurrentMember = createAction('CLEAR_CURRENT_MEMBER');
