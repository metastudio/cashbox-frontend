import { noop } from 'lodash';
import { createAction } from 'typesafe-actions';

import { ID } from 'model-types';
import { ICustomer, ICustomerParams } from './types';

const loadCustomers = {
  request: createAction(
    'LOAD_CUSTOMERS_REQUEST',
    (resolve) => {
      return (orgId: ID) => resolve({ orgId });
    },
  ),
  success: createAction(
    'LOAD_CUSTOMERS_SUCCESS',
    (resolve) => {
      return (orgId: ID, customers: ICustomer[]) => resolve({ orgId, customers });
    },
  ),
  failure: createAction(
    'LOAD_CUSTOMERS_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

const loadCustomer = {
  request: createAction(
    'LOAD_CUSTOMER_REQUEST',
    (resolve) => {
      return (orgId: ID, customerId: ID) => resolve({ orgId, customerId });
    },
  ),
  success: createAction(
    'LOAD_CUSTOMER_SUCCESS',
    (resolve) => {
      return (orgId: ID, customer: ICustomer) => resolve({ orgId, customer });
    },
  ),
  failure: createAction(
    'LOAD_CUSTOMER_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

const createCustomer = {
  request: createAction(
    'CREATE_CUSTOMER_REQUEST',
    (res) => {
      return (
        orgId:   ID,
        data:    ICustomerParams,
        resolve: ((customer: ICustomer) => void) = noop,
        reject:  ((error: Error) => void)        = noop,
      ) => res(
        { orgId, data },
        { resolve, reject },
      );
    },
  ),
  success: createAction(
    'CREATE_CUSTOMER_SUCCESS',
    (resolve) => {
      return (orgId: ID, customer: ICustomer) => resolve({ orgId, customer });
    },
  ),
  failure: createAction(
    'CREATE_CUSTOMER_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

const updateCustomer = {
  request: createAction(
    'UPDATE_CUSTOMER_REQUEST',
    (res) => {
      return (
        orgId:      ID,
        customerId: ID,
        data:       ICustomerParams,
        resolve:    ((customer: ICustomer) => void) = noop,
        reject:     ((error: Error) => void)        = noop,
      ) => res(
        { orgId, customerId, data },
        { resolve, reject },
      );
    },
  ),
  success: createAction(
    'UPDATE_CUSTOMER_SUCCESS',
    (resolve) => {
      return (orgId: ID, customer: ICustomer) => resolve({ orgId, customer });
    },
  ),
  failure: createAction(
    'UPDATE_CUSTOMER_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

const deleteCustomer = {
  request: createAction(
    'DELETE_CUSTOMER_REQUEST',
    (res) => {
      return (
        orgId:      ID,
        customerId: ID,
        resolve:    ((customer: ICustomer) => void) = noop,
        reject:     ((error: Error) => void)        = noop,
      ) => res(
        { orgId, customerId },
        { resolve, reject },
      );
    },
  ),
  success: createAction(
    'DELETE_CUSTOMER_SUCCESS',
    (resolve) => {
      return (orgId: ID, customer: ICustomer) => resolve({ orgId, customer });
    },
  ),
  failure: createAction(
    'DELETE_CUSTOMER_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

export {
  loadCustomers,
  loadCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
