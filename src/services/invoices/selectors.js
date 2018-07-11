const selectInvoices            = (state) => state.invoices.items;
const selectInvoicesStatus      = (state) => state.invoices.status;
const selectInvoicesPagination  = (state) => state.invoices.pagination;

const selectUnpaidInvoices           = (state) => state.unpaidInvoices.items;
const selectUnpaidInvoicesStatus     = (state) => state.unpaidInvoices.status;
const selectUnpaidInvoicesPagination = (state) => state.unpaidInvoices.pagination;

const selectUnpaidInvoicesCount        = (state) => state.unpaidInvoicesCount.count;
const selectUnpaidInvoicesCountsStatus = (state) => state.unpaidInvoicesCount.status;

const selectInvoice       = (state) => state.invoice.item;
const selectInvoiceStatus = (state) => state.invoice.status;

export {
  selectInvoices,
  selectInvoicesStatus,
  selectInvoicesPagination,

  selectUnpaidInvoices,
  selectUnpaidInvoicesStatus,
  selectUnpaidInvoicesPagination,

  selectUnpaidInvoicesCount,
  selectUnpaidInvoicesCountsStatus,

  selectInvoice,
  selectInvoiceStatus,
};
