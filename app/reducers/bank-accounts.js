import * as types from 'constants/bank-accounts-action-types'
import * as statuses from 'constants/statuses'

const defaultState = {
  items:  [],
  status: statuses.INVALID,
  error:  null,
}

export default (state = defaultState, action) => {
  const { type, payload } = action

  switch(type) {
    case types.LOAD_TRANSACTIONS_REQUEST:
      return {
        ...state,
        items:  [],
        status: statuses.PENDING,
        error:  null,
      }
    case types.LOAD_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        items:  payload.transactions,
        status: statuses.SUCCESS,
        error:  null,
      }
    case types.LOAD_TRANSACTIONS_FAILURE:
      return {
        ...state,
        items:  [],
        status: statuses.FAILURE,
        error:  payload
      }
    default:
      return state
  }
}
