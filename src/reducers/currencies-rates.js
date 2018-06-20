import { handleActions } from 'redux-actions'

import * as statuses from 'constants/statuses.js'
import { loadCurrenciesRates } from 'actions/currencies.js'

const defaultState = {
  items:  [],
  updatedOn: null,
  status: statuses.INVALID,
  error:  null,
}

export default handleActions({
  [loadCurrenciesRates.request]: (state) => ({
    ...state,
    items:  [],
    updatedOn: null,
    status: statuses.PENDING,
    error:  null,
  }),
  [loadCurrenciesRates.success]: (state, { payload }) => ({
    ...state,
    items:  payload.rates.rates,
    updatedOn: payload.rates.ratesUpdatedOn,
    status: statuses.SUCCESS,
    error:  null,
  }),
  [loadCurrenciesRates.failure]: (state, { payload }) => ({
    ...state,
    items:  [],
    updatedOn: null,
    status: statuses.FAILURE,
    error:  payload
  }),
}, defaultState)
