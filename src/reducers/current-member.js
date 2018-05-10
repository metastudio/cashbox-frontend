import { handleActions, combineActions } from 'redux-actions';

import { loadCurrentMember, clearCurrentMember } from 'actions/members.js';
import { restoreSession } from 'actions/auth.js';

const defaultState = {
  id:   null,
  data: null,
};

export default handleActions({
  [combineActions(loadCurrentMember.success, restoreSession.success)]: (state, { payload }) => ({
    ...state,
    id:   payload.member && payload.member.id,
    data: payload.member,
  }),
  [clearCurrentMember]: (state) => ({
    ...state,
    id:   null,
    data: null,
  }),
}, defaultState);
