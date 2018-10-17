import { noop } from 'lodash';
import { createAction } from 'typesafe-actions';

import { ID, IPagination } from 'model-types';
import { IInvoice, IInvoiceParams } from './types';

const loadInvoices = {
  request: createAction(
    'LOAD_INVOICES_REQUEST',
    (resolve) => {
      return (orgId: ID, query: {}) => resolve({ orgId, query });
    },
  ),
  success: createAction(
    'LOAD_INVOICES_SUCCESS',
    (resolve) => {
      return (
        orgId:      ID,
        invoices:   IInvoice[],
        pagination: IPagination,
      ) => resolve(
        { orgId, invoices, pagination },
      );
    },
  ),
  failure: createAction(
    'LOAD_INVOICES_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

const loadUnpaidInvoices = {
  request: createAction(
    'LOAD_UNPAID_INVOICES_REQUEST',
    (resolve) => {
      return (orgId: ID, query: {}) => resolve({ orgId, query });
    },
  ),
  success: createAction(
    'LOAD_UNPAID_INVOICES_SUCCESS',
    (resolve) => {
      return (
        orgId:      ID,
        invoices:   IInvoice[],
        pagination: IPagination,
      ) => resolve(
        { orgId, invoices, pagination },
      );
    },
  ),
  failure: createAction(
    'LOAD_UNPAID_INVOICES_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

const loadInvoice = {
  request: createAction(
    'LOAD_INVOICE_REQUEST',
    (resolve) => {
      return (orgId: ID, invoiceId: ID) => resolve({ orgId, invoiceId });
    },
  ),
  success: createAction(
    'LOAD_INVOICE_SUCCESS',
    (resolve) => {
      return (orgId: ID, invoice: IInvoice) => resolve({ orgId, invoice });
    },
  ),
  failure: createAction(
    'LOAD_INVOICE_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

const loadUnpaidInvoicesCount = {
  request: createAction(
    'LOAD_UNPAID_INVOICES_COUNT_REQUEST',
    (resolve) => {
      return (orgId: ID) => resolve({ orgId });
    },
  ),
  success: createAction(
    'LOAD_UNPAID_INVOICES_COUNT_SUCCESS',
    (resolve) => {
      return (orgId: ID, unpaidCount: number) => resolve({ orgId, unpaidCount });
    },
  ),
  failure: createAction(
    'LOAD_UNPAID_INVOICES_COUNT_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

const createInvoice = {
  request: createAction(
    'CREATE_INVOICE_REQUEST',
    (res) => {
      return (
        orgId:   ID,
        data:    IInvoiceParams,
        resolve: ((invoice: IInvoice) => void) = noop,
        reject:  ((error: Error) => void)      = noop,
      ) => res(
        { orgId, data },
        { resolve, reject },
      );
    },
  ),
  success: createAction(
    'CREATE_INVOICE_SUCCESS',
    (resolve) => {
      return (orgId: ID, invoice: IInvoice) => resolve({ orgId, invoice });
    },
  ),
  failure: createAction(
    'CREATE_INVOICE_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

const updateInvoice = {
  request: createAction(
    'UPDATE_INVOICE_REQUEST',
    (res) => {
      return (
        orgId:     ID,
        invoiceId: ID,
        data:      IInvoiceParams,
        resolve:   ((invoice: IInvoice) => void) = noop,
        reject:    ((error: Error) => void)      = noop,
      ) => res(
        { orgId, invoiceId, data },
        { resolve, reject },
      );
    },
  ),
  success: createAction(
    'UPDATE_INVOICE_SUCCESS',
    (resolve) => {
      return (orgId: ID, invoice: IInvoice) => resolve({ orgId, invoice });
    },
  ),
  failure: createAction(
    'UPDATE_INVOICE_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

const destroyInvoice = {
  request: createAction(
    'DESTROY_INVOICE_REQUEST',
    (res) => {
      return (
        orgId:     ID,
        invoiceId: ID,
        resolve:   ((invoice: IInvoice) => void) = noop,
        reject:    ((error: Error) => void)      = noop,
      ) => res(
        { orgId, invoiceId },
        { resolve, reject },
      );
    },
  ),
  success: createAction(
    'DESTROY_INVOICE_SUCCESS',
    (resolve) => {
      return (orgId: ID, invoice: IInvoice) => resolve({ orgId, invoice });
    },
  ),
  failure: createAction(
    'DESTROY_INVOICE_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

const downloadInvoicePDF = {
  request: createAction(
    'DOWNLOAD_INVOICE_PDF_REQUEST',
    (res) => {
      return (
        orgId:     ID,
        invoiceId: ID,
        resolve:   ((pdf: Blob) => void)   = noop,
        reject:    ((error: Error) => void) = noop,
      ) => res(
        { orgId, invoiceId },
        { resolve, reject },
      );
    },
  ),
  success: createAction(
    'DOWNLOAD_INVOICE_PDF_SUCCESS',
    (resolve) => {
      return (orgId: ID, pdf: Blob) => resolve({ orgId, pdf });
    },
  ),
  failure: createAction(
    'DOWNLOAD_INVOICE_PDF_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

export {
  loadInvoices,
  loadUnpaidInvoices,
  loadInvoice,
  loadUnpaidInvoicesCount,
  createInvoice,
  updateInvoice,
  destroyInvoice,
  downloadInvoicePDF,
};
