import * as types from 'constants/customers-action-types'
import * as statuses from 'constants/statuses'

const defaultState = {
  items:  [],
  status: statuses.INVALID,
  error:  null,
}

export default (state = defaultState, action) => {
  const { type, payload } = action

  switch(type) {
    case types.LOAD_CUSTOMERS_REQUEST:
      return {
        ...state,
        items:  [],
        status: statuses.PENDING,
        error:  null,
      }
    case types.LOAD_CUSTOMERS_SUCCESS:
      return {
        ...state,
        items:  payload.customers,
        status: statuses.SUCCESS,
        error:  null,
      }
    case types.LOAD_CUSTOMERS_FAILURE:
      return {
        ...state,
        items:  [],
        status: statuses.FAILURE,
        error:  payload
      }
    case types.DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        items:  state.items.filter((item) => item.id != payload.customer.id),
        status: statuses.SUCCESS,
        error:  null,
      }
    default:
      return state
  }
}
