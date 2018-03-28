import { find } from 'lodash'

export const getCurrentInvoice = (state) => state.invoices.currentInvoice

export const invoiceSelector = (state, id) => find(state, { id: id })
export const invoicesSelector = (state) => state.invoices.items
export const paginationSelector = (state) => state.invoices.paginationSelector
export const unpaidCountSelector = (state) => state.invoices.unpaidCount
