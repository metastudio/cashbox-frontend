import humps from 'humps'

import ApiHelpers from './_api_helpers'

import * as types from 'constants/bank-accounts-action-types'

import { CALL_API, getJSON } from 'redux-api-middleware'

const bankAccountsEndpoint = (orgId) => `/api/organizations/${orgId}/bank_accounts`
const bankAccountEndpoint = (orgId, bankAccountId) => `/api/organizations/${orgId}/bank_accounts/${bankAccountId}`

export function loadBankAccounts(organizationId) {
  return {
    [CALL_API]: {
      endpoint: ApiHelpers.formatUrl(bankAccountsEndpoint(organizationId)),
      method:   'GET',
      headers:  ApiHelpers.headers,
      types: [
        types.LOAD_BANK_ACCOUNTS_REQUEST,
        {
          type: types.LOAD_BANK_ACCOUNTS_SUCCESS,
          payload: (action, state, res) => {
            return getJSON(res).then((json) => ({ bankAccounts: humps.camelizeKeys(json) }))
          }
        },
        {
          type: types.LOAD_BANK_ACCOUNTS_FAILURE,
          payload: ApiHelpers.failurePayload
        }
      ]
    }
  }
}

export function createBankAccount(organizationId, data) {
  return {
    [CALL_API]: {
      endpoint: ApiHelpers.formatUrl(bankAccountsEndpoint(organizationId)),
      method:   'POST',
      headers:  ApiHelpers.headers,
      body:     ApiHelpers.formatJsonBody({ bankAccount: data }),
      types: [
        types.CREATE_BANK_ACCOUNT_REQUEST,
        {
          type: types.CREATE_BANK_ACCOUNT_SUCCESS,
          payload: (action, state, res) => {
            return getJSON(res).then((json) => ({ bankAccount: humps.camelizeKeys(json) }))
          }
        },
        {
          type: types.CREATE_BANK_ACCOUNT_FAILURE,
          payload: ApiHelpers.failurePayload
        }
      ]
    }
  }
}

export function loadBankAccount(organizationId, bankAccountId) {
  return {
    [CALL_API]: {
      endpoint: ApiHelpers.formatUrl(bankAccountEndpoint(organizationId, bankAccountId)),
      method:   'GET',
      headers:  ApiHelpers.headers,
      types: [
        types.LOAD_BANK_ACCOUNT_REQUEST,
        {
          type: types.LOAD_BANK_ACCOUNT_SUCCESS,
          payload: (action, state, res) => {
            return getJSON(res).then((json) => ({ bankAccount: humps.camelizeKeys(json) }))
          }
        },
        {
          type: types.LOAD_BANK_ACCOUNT_FAILURE,
          payload: ApiHelpers.failurePayload
        }
      ]
    }
  }
}

export function updateBankAccount(organizationId, bankAccountId, data) {
  return {
    [CALL_API]: {
      endpoint: ApiHelpers.formatUrl(bankAccountEndpoint(organizationId, bankAccountId)),
      method:   'PUT',
      headers:  ApiHelpers.headers,
      body:     ApiHelpers.formatJsonBody({ bankAccount: data }),
      types: [
        types.UPDATE_BANK_ACCOUNT_REQUEST,
        {
          type: types.UPDATE_BANK_ACCOUNT_SUCCESS,
          payload: (action, state, res) => {
            return getJSON(res).then((json) => ({ bankAccount: humps.camelizeKeys(json) }))
          }
        },
        {
          type: types.UPDATE_BANK_ACCOUNT_FAILURE,
          payload: ApiHelpers.failurePayload
        }
      ]
    }
  }
}

export function deleteBankAccount(organizationId, bankAccountId) {
  return {
    [CALL_API]: {
      endpoint: ApiHelpers.formatUrl(bankAccountEndpoint(organizationId, bankAccountId)),
      method:   'DELETE',
      headers:  ApiHelpers.headers,
      types: [
        types.DELETE_BANK_ACCOUNT_REQUEST,
        {
          type: types.DELETE_BANK_ACCOUNT_SUCCESS,
          payload: (action, state, res) => {
            return getJSON(res).then((json) => ({ bankAccount: humps.camelizeKeys(json) }))
          }
        },
        {
          type: types.DELETE_BANK_ACCOUNT_FAILURE,
          payload: ApiHelpers.failurePayload
        }
      ]
    }
  }
}
