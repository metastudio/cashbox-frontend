import { createAction } from 'redux-actions';
import { noop } from 'lodash';

export const loadMembers = createAction('LOAD_MEMBERS', (organizationId) => ({ organizationId }));
loadMembers.request = createAction('LOAD_MEMBERS_REQUEST', (organizationId) => ({ organizationId }));
loadMembers.success = createAction('LOAD_MEMBERS_SUCCESS', (organizationId, members) => ({ organizationId, members }));
loadMembers.failure = createAction('LOAD_MEMBERS_FAILURE');

export const updateMemberLastVisit = createAction('UPDATE_MEMBER_LAST_VISIT', (organizationId) => ({ organizationId }),
  (_organizationId, _memberId, resolve = noop, reject = noop) => ({ resolve, reject }));
updateMemberLastVisit.request = createAction('UPDATE_MEMBER_LAST_VISIT_REQUEST', (organizationId) => ({ organizationId }));
updateMemberLastVisit.success = createAction('UPDATE_MEMBER_LAST_VISIT_SUCCESS', (organizationId, member) => ({ organizationId, member }));
updateMemberLastVisit.failure = createAction('UPDATE_MEMBER_LAST_VISIT_FAILURE');
