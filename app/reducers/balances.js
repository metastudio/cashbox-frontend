import * as types from 'constants/balances-action-types'
import * as statuses from 'constants/statuses'

const defaultState = {
  totalAmount: null,
  defaultCurrency: null,
  totals: [],
  status: statuses.INVALID,
  error:  null,
}

export default (state = defaultState, action) => {
  const { type, payload } = action

  switch(type) {
    case types.LOAD_ORGANIZATION_BALANCES_REQUEST:
      return {
        ...state,
        totalAmount: null,
        defaultCurrency: null,
        totals: [],
        status: statuses.PENDING,
        error:  null,
      }
    case types.LOAD_ORGANIZATION_BALANCES_SUCCESS:
      return {
        ...state,
        totalAmount: payload.balances.totalAmount,
        defaultCurrency: payload.balances.defaultCurrency,
        totals: payload.balances.totals,
        status: statuses.SUCCESS,
        error:  null,
      }
    case types.LOAD_ORGANIZATION_BALANCES_FAILURE:
      return {
        ...state,
        totalAmount: null,
        defaultCurrency: null,
        totals: [],
        status: statuses.FAILURE,
        error:  payload
      }
    default:
      return state
  }
}
