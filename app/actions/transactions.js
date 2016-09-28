import humps from 'humps'

import ApiHelpers from './_api_helpers'

import * as types from 'constants/transactions-action-types'

import { CALL_API, getJSON } from 'redux-api-middleware'

const transactionsEndpoint = (orgId) => `/api/organizations/${orgId}/transactions`

export function loadTransactions(organizationId) {
  return {
    [CALL_API]: {
      endpoint: ApiHelpers.formatUrl(transactionsEndpoint(organizationId)),
      method:   'GET',
      headers:  ApiHelpers.headers,
      types: [
        types.LOAD_TRANSACTIONS_REQUEST,
        {
          type: types.LOAD_TRANSACTIONS_SUCCESS,
          payload: (action, state, res) => {
            return getJSON(res).then((json) => ({ transactions: humps.camelizeKeys(json) }))
          }
        },
        {
          type: types.LOAD_TRANSACTIONS_FAILURE,
          payload: ApiHelpers.failurePayload
        }
      ]
    }
  }
}
