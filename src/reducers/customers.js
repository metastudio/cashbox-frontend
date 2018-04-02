import { handleActions } from 'redux-actions'

import * as statuses from 'constants/statuses.js'
import { loadCustomers, deleteCustomer } from 'actions/customers.js'

const defaultState = {
  items:  [],
  status: statuses.INVALID,
  error:  null,
}

export default handleActions({
  [loadCustomers.request]: (state) => ({
    ...state,
    items:  [],
    status: statuses.PENDING,
    error:  null,
  }),
  [loadCustomers.success]: (state, { payload }) => ({
    ...state,
    items:  payload.customers,
    status: statuses.SUCCESS,
    error:  null,
  }),
  [loadCustomers.failure]: (state, { payload }) => ({
    ...state,
    items:  [],
    status: statuses.FAILURE,
    error:  payload
  }),
  [deleteCustomer.success]: (state, { payload }) => ({
    ...state,
    items:  state.items.filter((item) => item.id != payload.customer.id),
    status: statuses.SUCCESS,
    error:  null
  }),
}, defaultState)
