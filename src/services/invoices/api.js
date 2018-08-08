import { prepareURL, getApi, postApi, deleteApi, patchApi, getPDF } from 'utils/api-helpers';

const invoicesUrl            = (orgId, params) => prepareURL(`/api/organizations/${orgId}/invoices`, params);
const unpaidInvoicesUrl      = (orgId, params) => prepareURL(`/api/organizations/${orgId}/invoices/unpaid`, params);
const unpaidInvoicesCountUrl = (orgId) => prepareURL(`/api/organizations/${orgId}/invoices/unpaid/count`);
const invoiceUrl             = (orgId, invoiceId) => prepareURL(`/api/organizations/${orgId}/invoices/${invoiceId}`);
const invoicePDFUrl          = (orgId, invoiceId) => prepareURL(`/api/organizations/${orgId}/invoices/${invoiceId}.pdf`);

export const getInvoices            = (orgId, params)    => getApi(invoicesUrl(orgId, params));
export const getUnpaidInvoices      = (orgId, params)    => getApi(unpaidInvoicesUrl(orgId, params));
export const getUnpaidInvoicesCount = (orgId)            => getApi(unpaidInvoicesCountUrl(orgId));
export const postInvoice            = (orgId, data)      => postApi(invoicesUrl(orgId), { invoice: data });
export const getInvoice             = (orgId, invoiceId) => getApi(invoiceUrl(orgId, invoiceId));
export const deleteInvoice          = (orgId, invoiceId) => deleteApi(invoiceUrl(orgId, invoiceId));
export const getInvoicePDF          = (orgId, invoiceId) => getPDF(invoicePDFUrl(orgId, invoiceId));
export const patchInvoice           = (orgId, invoiceId, data) => patchApi(invoiceUrl(orgId, invoiceId), { invoice: data });
