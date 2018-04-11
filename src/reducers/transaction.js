import { handleActions } from 'redux-actions'

import * as statuses from 'constants/statuses.js'
import { loadTransaction } from 'actions/transactions.js'

const defaultState = {
  data:   null,
  status: statuses.INVALID,
  error:  null,
}

export default handleActions({
  [loadTransaction.request]: (state) => ({
    ...state,
    data:   null,
    status: statuses.PENDING,
    error:  null,
  }),
  [loadTransaction.success]: (state, { payload }) => ({
    ...state,
    data:   payload.transaction,
    status: statuses.SUCCESS,
    error:  null,
  }),
  [loadTransaction.failure]: (state, { payload }) => ({
    ...state,
    data:   null,
    status: statuses.FAILURE,
    error:  payload
  }),
}, defaultState)
