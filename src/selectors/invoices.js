const selectInvoices            = (state) => state.invoices.items;
const selectInvoicesStatus      = (state) => state.invoices.status;
const selectInvoicesPagination  = (state) => state.invoices.paginationSelector;
const selectInvoicesUnpaidCount = (state) => state.invoices.unpaidCount;

export { selectInvoices, selectInvoicesStatus, selectInvoicesPagination, selectInvoicesUnpaidCount };
