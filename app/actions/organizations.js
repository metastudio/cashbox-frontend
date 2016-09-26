import humps from 'humps'

import ApiHelpers from './_api_helpers'

import * as types from 'constants/organizations-action-types'

import { CALL_API, getJSON } from 'redux-api-middleware'

const ORGANIZATIONS_ENDPOINT = '/api/organizations'

export function createOrganization(data) {
  return {
    [CALL_API]: {
      endpoint: ApiHelpers.formatUrl(ORGANIZATIONS_ENDPOINT),
      method:   'POST',
      headers:  ApiHelpers.headers,
      body:     ApiHelpers.formatJsonBody({ organization: data }),
      types: [
        types.CREATE_ORGANIZATION_REQUEST,
        {
          type: types.CREATE_ORGANIZATION_SUCCESS,
          payload: (action, state, res) => {
            return getJSON(res).then((json) => ({ organization: humps.camelizeKeys(json) }))
          }
        },
        {
          type: types.CREATE_ORGANIZATION_FAILURE,
          payload: ApiHelpers.failurePayload
        }
      ]
    }
  }
}
