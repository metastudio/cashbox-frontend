import { handleActions } from 'redux-actions';

import * as statuses from 'constants/statuses.js';
import {
  loadTransaction,
  updateTransaction,
  destroyTransaction,
} from '../actions.js';
import { setCurrentOrganization } from 'services/organizations/actions.js';

const defaultState = {
  id:     null,
  item:   null,
  status: statuses.INVALID,
  error:  null,
};

export default handleActions({
  [loadTransaction.request]: (state, { payload }) => ({
    ...state,
    id:     payload.id,
    status: statuses.PENDING,
    error:  null,
  }),
  [loadTransaction.success]: (state, { payload }) => ({
    ...state,
    status: statuses.SUCCESS,
    error:  null,
    item:   payload.transaction,
  }),
  [loadTransaction.failure]: (state, { payload }) => ({
    ...state,
    status: statuses.FAILURE,
    error:  payload,
  }),
  [updateTransaction.success]: (state, { payload }) => ({
    ...state,
    item: state.item.id === payload.transaction.id ? payload.transaction : state.item,
  }),
  [destroyTransaction.success]: (state, { payload }) => ({
    ...state,
    status: state.item.id === payload.transactionId ? statuses.INVALID : state.status,
  }),
  [setCurrentOrganization.success]: (state) => ({
    ...state,
    ...defaultState,
  }),
}, defaultState);
