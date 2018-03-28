import { handleActions } from 'redux-actions'

import {
  loadInvoices,
  createInvoice,
  loadInvoice
} from 'actions'

const defaultState = {
  currentInvoice: null,
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
      currentInvoice: null
    })
  },
  [createInvoice.success]: (state, { payload }) => ({
    ...state,
    items: [
      payload.invoice,
      ...state.items
    ]
  }),
  [loadInvoice.success]: (state, { payload }) => ({
    ...state,
    currentInvoice: payload.invoice,
    items: state.items
  })
}, defaultState)

