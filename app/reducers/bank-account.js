import * as types from 'constants/bank-accounts-action-types'
import * as statuses from 'constants/statuses'

const defaultState = {
  current: null,
  status:  statuses.INVALID,
  error:   null,
}

export default (state = defaultState, action) => {
  const { type, payload } = action

  switch(type) {
    case types.LOAD_BANK_ACCOUNT_REQUEST:
      return {
        ...state,
        current: null,
        status:  statuses.PENDING,
        error:   null,
      }
    case types.LOAD_BANK_ACCOUNT_SUCCESS:
      return {
        ...state,
        current: payload.bankAccount,
        status:  statuses.SUCCESS,
        error:   null,
      }
    case types.LOAD_BANK_ACCOUNT_FAILURE:
      return {
        ...state,
        current: null,
        status:  statuses.FAILURE,
        error:   payload,
      }
    case types.CLEAR_BANK_ACCOUNT:
      return {
        ...state,
        current: null,
        status:  statuses.INVALID,
        error:   null,
      }
    default:
      return state
  }
}
