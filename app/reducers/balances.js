import { handleActions } from 'redux-actions'

import * as statuses from 'constants/statuses'

import {
  loadOrganizationBalancesRequest, loadOrganizationBalancesSuccess, loadOrganizationBalancesFailure,
} from 'actions'

const defaultState = {
  totalAmount: null,
  defaultCurrency: null,
  totals: [],
  status: statuses.INVALID,
  error:  null,
}

export default handleActions({
  [loadOrganizationBalancesRequest]: (state) => ({
    ...state,
    totalAmount:     null,
    defaultCurrency: null,
    totals:          [],
    status:          statuses.PENDING,
    error:           null,
  }),
  [loadOrganizationBalancesSuccess]: (state, { payload }) => ({
    ...state,
    totalAmount:     payload.balances.totalAmount,
    defaultCurrency: payload.balances.defaultCurrency,
    totals:          payload.balances.totals,
    status:          statuses.SUCCESS,
    error:           null,
  }),
  [loadOrganizationBalancesFailure]: (state, { payload }) => ({
    ...state,
    totalAmount:     null,
    defaultCurrency: null,
    totals:          [],
    status:          statuses.FAILURE,
    error:           payload
  }),
}, defaultState)
