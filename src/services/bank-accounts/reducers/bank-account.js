import { handleActions } from 'redux-actions';

import * as statuses from 'constants/statuses.js';
import { loadBankAccount } from '../actions';
import { setCurrentOrganization } from 'services/organizations/actions.js';

const defaultState = {
  data:   null,
  status: statuses.INVALID,
  error:  null,
};

export default handleActions({
  [loadBankAccount.request]: (state) => ({
    ...state,
    data:   null,
    status: statuses.PENDING,
    error:  null,
  }),
  [loadBankAccount.success]: (state, { payload }) => ({
    ...state,
    data:   payload.bankAccount,
    status: statuses.SUCCESS,
    error:  null,
  }),
  [loadBankAccount.failure]: (state, { payload }) => ({
    ...state,
    data:   null,
    status: statuses.FAILURE,
    error:  payload,
  }),
  [setCurrentOrganization.success]: (state) => ({
    ...state,
    ...defaultState,
  }),
}, defaultState);