import * as types from 'constants/transactions-action-types'

const defaultState = {
  transactions: []
}

export default (state = defaultState, action) => {
  const { type, payload } = action

  switch(type) {
    case types.LOAD_TRANSACTIONS_REQUEST:
      return {
        ...state,
        transactions: []
      }
    case types.LOAD_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        transactions: payload.transactions,
      }
    case types.LOAD_TRANSACTIONS_FAILURE:
      return {
        ...state,
        transactions: []
      }
    default:
      return state
  }
}
