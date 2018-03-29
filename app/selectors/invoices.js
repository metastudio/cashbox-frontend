import { find } from 'lodash'

export const invoiceSelector = (state, id) => find(state.invoices.items, { id: parseInt(id) })
export const invoicesSelector = (state) => state.invoices.items
export const paginationSelector = (state) => state.invoices.paginationSelector
export const unpaidCountSelector = (state) => state.invoices.unpaidCount
