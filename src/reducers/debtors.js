import { handleActions } from 'redux-actions'

import * as statuses from 'constants/statuses.js'
import { loadDebtors } from 'actions/debtors.js'

const defaultState = {
  items:  [],
  status: statuses.INVALID,
  error:  null,
}

export default handleActions({
  [loadDebtors.request]: (state) => ({
    ...state,
    items:  [],
    status: statuses.PENDING,
    error:  null,
  }),
  [loadDebtors.success]: (state, { payload }) => ({
    ...state,
    items:  payload.debtors,
    status: statuses.SUCCESS,
    error:  null,
  }),
  [loadDebtors.failure]: (state, { payload }) => ({
    ...state,
    items:  [],
    status: statuses.FAILURE,
    error:  payload
  }),
}, defaultState)
