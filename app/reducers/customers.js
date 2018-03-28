import { handleActions } from 'redux-actions'

import {
  loadCustomers,
} from 'actions'

const defaultState = {
  items: []
}

export default handleActions({
  [loadCustomers.success]: (state, { payload }) => {
    return({
      ...state,
      items: payload.customers
    })
  }
}, defaultState)
