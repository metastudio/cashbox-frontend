import { handleActions } from 'redux-actions'

import * as statuses from 'constants/statuses'
import { loadTransactions } from 'actions'

const defaultState = {
  items:  [],
  status: statuses.INVALID,
  error:  null,
}

export default handleActions({
  [loadTransactions.request]: (state) => ({
    ...state,
    items:  [],
    status: statuses.PENDING,
    error:  null,
  }),
  [loadTransactions.success]: (state, { payload }) => ({
    ...state,
    items:  payload.transactions,
    status: statuses.SUCCESS,
    error:  null,
  }),
  [loadTransactions.failure]: (state, { payload }) => ({
    ...state,
    items:  [],
    status: statuses.FAILURE,
    error:  payload
  }),
}, defaultState)
