import { createAction } from 'typesafe-actions';

import { ID } from 'model-types';
import { IMember } from './types';

const loadMembers = {
  request: createAction(
    'LOAD_MEMBERS_REQUEST',
    (resolve) => {
      return (orgId: ID) => resolve({ orgId });
    },
  ),
  success: createAction(
    'LOAD_MEMBERS_SUCCESS',
    (resolve) => {
      return (orgId: ID, members: IMember[]) => resolve({ orgId, members });
    },
  ),
  failure: createAction(
    'LOAD_MEMBERS_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

const updateMemberLastVisit = {
  request: createAction(
    'UPDATE_MEMBER_LAST_VISIT_REQUEST',
    (resolve) => {
      return (orgId: ID) => resolve({ orgId });
    },
  ),
  success: createAction(
    'UPDATE_MEMBER_LAST_VISIT_SUCCESS',
    (resolve) => {
      return (orgId: ID, member: IMember) => resolve({ orgId, member });
    },
  ),
  failure: createAction(
    'UPDATE_MEMBER_LAST_VISIT_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

export {
  loadMembers,
  updateMemberLastVisit,
};
