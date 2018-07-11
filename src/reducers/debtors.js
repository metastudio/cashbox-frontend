import { handleActions } from 'redux-actions'

import * as statuses from 'constants/statuses.js'
import { loadDebtors } from 'actions/debtors.js'

const defaultState = {
  items:  [],
  total: 0,
  summByCurrencies: [],
  status: statuses.INVALID,
  error:  null,
}

export default handleActions({
  [loadDebtors.request]: (state) => ({
    ...state,
    items:  [],
    total: 0,
    summByCurrencies: [],
    status: statuses.PENDING,
    error:  null,
  }),
  [loadDebtors.success]: (state, { payload }) => ({
    ...state,
    items:  payload.debtors,
    total: payload.total,
    summByCurrencies: payload.summByCurrencies,
    status: statuses.SUCCESS,
    error:  null,
  }),
  [loadDebtors.failure]: (state, { payload }) => ({
    ...state,
    items:  [],
    total: 0,
    summByCurrencies: [],
    status: statuses.FAILURE,
    error:  payload
  }),
}, defaultState)
