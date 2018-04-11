import { prepareURL, getApi, postApi, deleteApi, patchApi } from './_helpers'

const invoicesListUrl = (orgId, params) => prepareURL(`/api/organizations/${orgId}/invoices`, params)
const newInvoiceUrl = (orgId) => prepareURL(`/api/organizations/${orgId}/invoices`)
const invoiceUrl = (orgId, invoiceId) => prepareURL(`/api/organizations/${orgId}/invoices/${invoiceId}`)
const invoicePDFUrl = (orgId, invoiceId) => prepareURL(`/api/organizations/${orgId}/invoices/${invoiceId}/download_pdf`)

export const getInvoices = (orgId, params) => getApi(invoicesListUrl(orgId, params))
export const postInvoice = (orgId, data) => postApi(newInvoiceUrl(orgId), { invoice: data })
export const getInvoice  = (orgId, invoiceId) => getApi(invoiceUrl(orgId, invoiceId))
export const deleteInvoice = (orgId, invoiceId) => deleteApi(invoiceUrl(orgId, invoiceId))
export const getInvoicePDF = (orgId, invoiceId) => getApi(invoicePDFUrl(orgId, invoiceId))
export const patchInvoice = (orgId, invoiceId, data) => patchApi(invoiceUrl(orgId, invoiceId), { invoice: data })

