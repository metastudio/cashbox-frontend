const selectInvoices            = (state) => state.invoices.items;
const selectInvoicesStatus      = (state) => state.invoices.status;
const selectInvoicesPagination  = (state) => state.invoices.paginationSelector;
const selectInvoicesUnpaidCount = (state) => state.invoices.unpaidCount;

const selectInvoice       = (state) => state.invoice.item;
const selectInvoiceStatus = (state) => state.invoice.status;

export {
  selectInvoices,
  selectInvoicesStatus,
  selectInvoicesPagination,
  selectInvoicesUnpaidCount,

  selectInvoice,
  selectInvoiceStatus,
};
