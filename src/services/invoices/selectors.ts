import { IGlobalState } from 'services/global-state';

const selectInvoices            = (state: IGlobalState) => state.invoices.items;
const selectInvoicesStatus      = (state: IGlobalState) => state.invoices.status;
const selectInvoicesPagination  = (state: IGlobalState) => state.invoices.pagination;

const selectUnpaidInvoices           = (state: IGlobalState) => state.unpaidInvoices.items;
const selectUnpaidInvoicesStatus     = (state: IGlobalState) => state.unpaidInvoices.status;
const selectUnpaidInvoicesPagination = (state: IGlobalState) => state.unpaidInvoices.pagination;

const selectUnpaidInvoicesCount       = (state: IGlobalState) => state.unpaidInvoicesCount.count;
const selectUnpaidInvoicesCountStatus = (state: IGlobalState) => state.unpaidInvoicesCount.status;

const selectInvoice       = (state: IGlobalState) => state.invoice.item;
const selectInvoiceStatus = (state: IGlobalState) => state.invoice.status;

export {
  selectInvoices,
  selectInvoicesStatus,
  selectInvoicesPagination,

  selectUnpaidInvoices,
  selectUnpaidInvoicesStatus,
  selectUnpaidInvoicesPagination,

  selectUnpaidInvoicesCount,
  selectUnpaidInvoicesCountStatus,

  selectInvoice,
  selectInvoiceStatus,
};
