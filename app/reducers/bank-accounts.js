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
    case types.LOAD_BANK_ACCOUNTS_REQUEST:
      return {
        ...state,
        items:  [],
        status: statuses.PENDING,
        error:  null,
      }
    case types.LOAD_BANK_ACCOUNTS_SUCCESS:
      return {
        ...state,
        items:  payload.bankAccounts,
        status: statuses.SUCCESS,
        error:  null,
      }
    case types.LOAD_BANK_ACCOUNTS_FAILURE:
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
