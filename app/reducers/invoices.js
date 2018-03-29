import { handleActions, combineActions } from 'redux-actions'

import {
  loadInvoices,
  createInvoice,
  loadInvoice
} from 'actions'

const defaultState = {
  items: [],
  pagination: null,
  unpaid_count: null
}

export default handleActions({
  [loadInvoices.success]: (state, { payload }) => {
    return({
      ...state,
      items: payload.invoices,
      pagination: payload.pagination,
      unpaidCount: payload.unpaidСount,
    })
  },
  [combineActions(createInvoice.success, loadInvoice.success)]: (state, { payload }) => ({
    ...state,
    items: [
      payload.invoice,
      ...state.items
    ]
  })
}, defaultState)

