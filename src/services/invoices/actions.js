import { createAction } from 'redux-actions';
import { noop } from 'lodash';

export const switchUnpaid = createAction('SWITCH_UNPAID');

export const loadInvoices = createAction('LOAD_INVOICES', (organizationId, params) => ({ organizationId, params }));
loadInvoices.request = createAction('LOAD_INVOICES_REQUEST', (organizationId) => ({ organizationId }));
loadInvoices.success = createAction('LOAD_INVOICES_SUCCESS', (organizationId, invoices, pagination) => ({ organizationId, invoices, pagination }));
loadInvoices.failure = createAction('LOAD_INVOICES_FAILURE');

export const loadUnpaidInvoices = createAction('LOAD_UNPAID_INVOICES', (organizationId, params) => ({ organizationId, params }));
loadUnpaidInvoices.request = createAction('LOAD_UNPAID_INVOICES_REQUEST', (organizationId) => ({ organizationId }));
loadUnpaidInvoices.success = createAction('LOAD_UNPAID_INVOICES_SUCCESS', (organizationId, invoices, pagination) => ({ organizationId, invoices, pagination }));
loadUnpaidInvoices.failure = createAction('LOAD_UNPAID_INVOICES_FAILURE');

export const loadUnpaidInvoicesCount = createAction('LOAD_UNPAID_INVOICES_COUNT', (organizationId) => ({ organizationId }));
loadUnpaidInvoicesCount.request = createAction('LOAD_UNPAID_INVOICES_COUNT_REQUEST', (organizationId) => ({ organizationId }));
loadUnpaidInvoicesCount.success = createAction('LOAD_UNPAID_INVOICES_COUNT_SUCCESS', (organizationId, unpaidCount) => ({ organizationId, unpaidCount }));
loadUnpaidInvoicesCount.failure = createAction('LOAD_UNPAID_INVOICES_COUNT_FAILURE');

export const createInvoice = createAction('CREATE_INVOICE', (organizationId, data) => ({ organizationId, data }), (_organizationId, _data, resolve = noop, reject = noop) => ({ resolve, reject }));
createInvoice.request = createAction('CREATE_INVOICE_REQUEST', (organizationId) => ({ organizationId }));
createInvoice.success = createAction('CREATE_INVOICE_SUCCESS', (organizationId, invoice) => ({ organizationId, invoice }));
createInvoice.failure = createAction('CREATE_INVOICE_FAILURE');

export const loadInvoice = createAction('LOAD_INVOICE', (organizationId, invoiceId) => ({ organizationId, invoiceId }));
loadInvoice.request = createAction('LOAD_INVOICE_REQUEST', (organizationId, invoiceId) => ({ organizationId, invoiceId }));
loadInvoice.success = createAction('LOAD_INVOICE_SUCCESS', (organizationId, invoice) => ({ organizationId, invoice }));
loadInvoice.failure = createAction('LOAD_INVOICE_FAILURE');

export const destroyInvoice = createAction('DESTROY_INVOICE', (organizationId, invoiceId) => ({ organizationId, invoiceId }), (_organizationId, _invoiceId, resolve = noop, reject = noop) => ({ resolve, reject }));
destroyInvoice.request = createAction('DESTROY_INVOICE_REQUEST', (organizationId) => ({ organizationId }));
destroyInvoice.success = createAction('DESTROY_INVOICE_SUCCESS', (organizationId, invoice) => ({ organizationId, invoice }));
destroyInvoice.failure = createAction('DESTROY_INVOICE_FAILURE');

export const downloadInvoicePDF = createAction('DOWNLOAD_INVOICE_PDF', (organizationId, invoiceId) => ({ organizationId, invoiceId }), (_organizationId, _invoiceId, resolve = noop, reject = noop) => ({ resolve, reject }));
downloadInvoicePDF.request = createAction('DOWNLOAD_INVOICE_PDF_REQUEST', (organizationId, invoiceId) => ({ organizationId, invoiceId }));
downloadInvoicePDF.success = createAction('DOWNLOAD_INVOICE_PDF_SUCCESS', (organizationId, pdf) => ({ organizationId, pdf }));
downloadInvoicePDF.failure = createAction('DOWNLOAD_INVOICE_PDF_FAILURE');

export const updateInvoice = createAction('UPDATE_INVOICE', (organizationId, invoiceId, data) => ({ organizationId, invoiceId, data }), (_organizationId, _invoiceId, _data, resolve = noop, reject = noop) => ({ resolve, reject }));
updateInvoice.request = createAction('UPDATE_INVOICE_REQUEST', (organizationId) => ({ organizationId }));
updateInvoice.success = createAction('UPDATE_INVOICE_SUCCESS', (organizationId, invoice) => ({ organizationId, invoice }));
updateInvoice.failure = createAction('UPDATE_INVOICE_FAILURE');
