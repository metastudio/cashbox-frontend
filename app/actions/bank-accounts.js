import humps from 'humps'

import ApiHelpers from './_api_helpers'

import * as types from 'constants/bank-accounts-action-types'

import { CALL_API, getJSON } from 'redux-api-middleware'

const bankAccountsEndpoint = (orgId) => `/api/organizations/${orgId}/bank_accounts`

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
