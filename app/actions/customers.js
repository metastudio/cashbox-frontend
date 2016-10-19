import humps from 'humps'

import ApiHelpers from './_api_helpers'

import * as types from 'constants/customers-action-types'

import { CALL_API, getJSON } from 'redux-api-middleware'

const customersEndpoint = (orgId) => `/api/organizations/${orgId}/customers`
const customerEndpoint = (orgId, customerId) => `/api/organizations/${orgId}/customers/${customerId}`

export function loadCustomers(organizationId) {
  return {
    [CALL_API]: {
      endpoint: ApiHelpers.formatUrl(customersEndpoint(organizationId)),
      method:   'GET',
      headers:  ApiHelpers.headers,
      types: [
        types.LOAD_CUSTOMERS_REQUEST,
        {
          type: types.LOAD_CUSTOMERS_SUCCESS,
          payload: (action, state, res) => {
            return getJSON(res).then((json) => ({ customers: humps.camelizeKeys(json) }))
          }
        },
        {
          type: types.LOAD_CUSTOMERS_FAILURE,
          payload: ApiHelpers.failurePayload
        }
      ]
    }
  }
}

export function createCustomer(organizationId, data) {
  return {
    [CALL_API]: {
      endpoint: ApiHelpers.formatUrl(customersEndpoint(organizationId)),
      method:   'POST',
      headers:  ApiHelpers.headers,
      body:     ApiHelpers.formatJsonBody({ customer: data }),
      types: [
        types.CREATE_CUSTOMER_REQUEST,
        {
          type: types.CREATE_CUSTOMER_SUCCESS,
          payload: (action, state, res) => {
            return getJSON(res).then((json) => ({ customer: humps.camelizeKeys(json) }))
          }
        },
        {
          type: types.CREATE_CUSTOMER_FAILURE,
          payload: ApiHelpers.failurePayload
        }
      ]
    }
  }
}

export function loadCustomer(organizationId, customerId) {
  return {
    [CALL_API]: {
      endpoint: ApiHelpers.formatUrl(customerEndpoint(organizationId, customerId)),
      method:   'GET',
      headers:  ApiHelpers.headers,
      types: [
        types.LOAD_CUSTOMER_REQUEST,
        {
          type: types.LOAD_CUSTOMER_SUCCESS,
          payload: (action, state, res) => {
            return getJSON(res).then((json) => ({ customer: humps.camelizeKeys(json) }))
          }
        },
        {
          type: types.LOAD_CUSTOMER_FAILURE,
          payload: ApiHelpers.failurePayload
        }
      ]
    }
  }
}

export function updateCustomer(organizationId, customerId, data) {
  return {
    [CALL_API]: {
      endpoint: ApiHelpers.formatUrl(customerEndpoint(organizationId, customerId)),
      method:   'PUT',
      headers:  ApiHelpers.headers,
      body:     ApiHelpers.formatJsonBody({ customer: data }),
      types: [
        types.UPDATE_CUSTOMER_REQUEST,
        {
          type: types.UPDATE_CUSTOMER_SUCCESS,
          payload: (action, state, res) => {
            return getJSON(res).then((json) => ({ customer: humps.camelizeKeys(json) }))
          }
        },
        {
          type: types.UPDATE_CUSTOMER_FAILURE,
          payload: ApiHelpers.failurePayload
        }
      ]
    }
  }
}

export function deleteCustomer(organizationId, customerId) {
  return {
    [CALL_API]: {
      endpoint: ApiHelpers.formatUrl(customerEndpoint(organizationId, customerId)),
      method:   'DELETE',
      headers:  ApiHelpers.headers,
      types: [
        types.DELETE_CUSTOMER_REQUEST,
        {
          type: types.DELETE_CUSTOMER_SUCCESS,
          payload: (action, state, res) => {
            return getJSON(res).then((json) => ({ customer: humps.camelizeKeys(json) }))
          }
        },
        {
          type: types.DELETE_CUSTOMER_FAILURE,
          payload: ApiHelpers.failurePayload
        }
      ]
    }
  }
}
