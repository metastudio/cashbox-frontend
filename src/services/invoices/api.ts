import { ID } from 'model-types';
import { deleteApi, getApi, getPDF, patchApi, postApi, prepareURL } from 'utils/api-helpers';

import { IInvoiceParams } from './types';

const invoicesUrl = (orgId: ID, query?: {}) => prepareURL(`/api/organizations/${orgId}/invoices`, query);
const unpaidInvoicesUrl = (orgId: ID, query?: {}) => prepareURL(`/api/organizations/${orgId}/invoices/unpaid`, query);
const unpaidInvoicesCountUrl = (orgId: ID) => prepareURL(`/api/organizations/${orgId}/invoices/unpaid/count`);
const invoiceUrl = (orgId: ID, invoiceId: ID) => prepareURL(`/api/organizations/${orgId}/invoices/${invoiceId}`);
const invoicePDFUrl = (orgId: ID, invoiceId: ID) => prepareURL(`/api/organizations/${orgId}/invoices/${invoiceId}.pdf`);

export const getInvoices = (orgId: ID, query?: {})    => getApi(invoicesUrl(orgId, query));
export const getUnpaidInvoices = (orgId: ID, query?: {})    => getApi(unpaidInvoicesUrl(orgId, query));
export const getUnpaidInvoicesCount = (orgId: ID)            => getApi(unpaidInvoicesCountUrl(orgId));
export const getInvoice = (orgId: ID, invoiceId: ID) => getApi(invoiceUrl(orgId, invoiceId));
export const getInvoicePDF = (orgId: ID, invoiceId: ID) => getPDF(invoicePDFUrl(orgId, invoiceId));
export const postInvoice = (orgId: ID, data: IInvoiceParams)      => postApi(invoicesUrl(orgId), { invoice: data });
export const deleteInvoice = (orgId: ID, invoiceId: ID) => deleteApi(invoiceUrl(orgId, invoiceId));
export const patchInvoice = (orgId: ID, invoiceId: ID, data: IInvoiceParams) => {
  return patchApi(invoiceUrl(orgId, invoiceId), { invoice: data });
};
