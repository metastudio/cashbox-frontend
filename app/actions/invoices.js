import { createAction } from 'redux-actions'
import { noop } from 'lodash'

export const switchUnpaid = createAction('SWITCH_UNPAID')

export const loadInvoices = createAction('LOAD_INVOICES', (organizationId, params) => ({ organizationId, params }))
loadInvoices.request = createAction('LOAD_INVOICES_REQUEST', (organizationId) => ({ organizationId }))
loadInvoices.success = createAction('LOAD_INVOICES_SUCCESS', (organizationId, invoices, pagination, unpaidСount) => ({ organizationId, invoices, pagination, unpaidСount }))
loadInvoices.failure = createAction('LOAD_INVOICES_FAILURE')

export const createInvoice = createAction('CREATE_INVOICE', (organizationId, data) => ({ organizationId, data }), (_organizationId, _data, resolve = noop, reject = noop) => ({ resolve, reject }))
createInvoice.request = createAction('CREATE_INVOICE_REQUEST', (organizationId) => ({ organizationId }))
createInvoice.success = createAction('CREATE_INVOICE_SUCCESS', (organizationId, invoice) => ({ organizationId, invoice }))
createInvoice.failure = createAction('CREATE_INVOICE_FAILURE')

export const loadInvoice = createAction('LOAD_INVOICE', (organizationId, invoiceId) => ({ organizationId, invoiceId }))
loadInvoice.request = createAction('LOAD_INVOICE_REQUEST', (organizationId, invoiceId) => ({ organizationId, invoiceId }))
loadInvoice.success = createAction('LOAD_INVOICE_SUCCESS', (organizationId, invoice) => ({ organizationId, invoice }))
loadInvoice.failure = createAction('LOAD_INVOICE_FAILURE')

export const destroyInvoice = createAction('DESTROY_INVOICE', (organizationId, invoiceId) => ({ organizationId, invoiceId }), (_organizationId, _invoiceId, resolve = noop, reject = noop) => ({ resolve, reject }))
destroyInvoice.request = createAction('DESTROY_INVOICE_REQUEST', (organizationId) => ({ organizationId }))
destroyInvoice.success = createAction('DESTROY_INVOICE_SUCCESS', (organizationId, invoice) => ({ organizationId, invoice }))
destroyInvoice.failure = createAction('DESTROY_INVOICE_FAILURE')

export const downloadInvoicePDF = createAction('DOWNLOAD_INVOICE_PDF', (organizationId, invoiceId) => ({ organizationId, invoiceId }))
downloadInvoicePDF.request = createAction('DOWNLOAD_INVOICE_PDF_REQUEST', (organizationId, invoiceId) => ({ organizationId, invoiceId }))
downloadInvoicePDF.success = createAction('DOWNLOAD_INVOICE_PDF_SUCCESS', (organizationId, pdf) => ({ organizationId, pdf }))
downloadInvoicePDF.failure = createAction('DOWNLOAD_INVOICE_PDF_FAILURE')
