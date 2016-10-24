import { handleActions } from 'redux-actions'

import * as statuses from 'constants/statuses'
import { loadBankAccounts, deleteBankAccount } from 'actions'

const defaultState = {
  items:  [],
  status: statuses.INVALID,
  error:  null,
}

export default handleActions({
  [loadBankAccounts.request]: (state) => ({
    ...state,
    items:  [],
    status: statuses.PENDING,
    error:  null,
  }),
  [loadBankAccounts.success]: (state, { payload }) => ({
    ...state,
    items:  payload.bankAccounts,
    status: statuses.SUCCESS,
    error:  null,
  }),
  [loadBankAccounts.failure]: (state, { payload }) => ({
    ...state,
    items:  [],
    status: statuses.FAILURE,
    error:  payload
  }),
  [deleteBankAccount.success]: (state, { payload }) => ({
    ...state,
    items:  state.items.filter((item) => item.id != payload.bankAccount.id),
    status: statuses.SUCCESS,
    error:  null
  }),
}, defaultState)
