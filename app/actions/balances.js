import humps from 'humps'

import ApiHelpers from './_api_helpers'

import * as types from 'constants/balances-action-types'

import { CALL_API, getJSON } from 'redux-api-middleware'

const balancesEndpoint = (orgId) => `/api/organizations/${orgId}/total_balances`

export function loadBalances(organizationId) {
  return {
    [CALL_API]: {
      endpoint: ApiHelpers.formatUrl(balancesEndpoint(organizationId)),
      method:   'GET',
      headers:  ApiHelpers.headers,
      types: [
        types.LOAD_ORGANIZATION_BALANCES_REQUEST,
        {
          type: types.LOAD_ORGANIZATION_BALANCES_SUCCESS,
          payload: (action, state, res) => {
            return getJSON(res).then((json) => ({ balances: humps.camelizeKeys(json) }))
          }
        },
        {
          type: types.LOAD_ORGANIZATION_BALANCES_FAILURE,
          payload: ApiHelpers.failurePayload
        }
      ]
    }
  }
}
