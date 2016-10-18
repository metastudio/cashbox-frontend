import * as types from 'constants/customers-action-types'
import * as statuses from 'constants/statuses'

const defaultState = {
  current: null,
  status:  statuses.INVALID,
  error:   null,
}

export default (state = defaultState, action) => {
  const { type, payload } = action

  switch(type) {
    case types.LOAD_CUSTOMER_REQUEST:
      return {
        ...state,
        current: null,
        status:  statuses.PENDING,
        error:   null,
      }
    case types.LOAD_CUSTOMER_SUCCESS:
      return {
        ...state,
        current: payload.customer,
        status:  statuses.SUCCESS,
        error:   null,
      }
    case types.LOAD_CUSTOMER_FAILURE:
      return {
        ...state,
        current: null,
        status:  statuses.FAILURE,
        error:   payload,
      }
    default:
      return state
  }
}
