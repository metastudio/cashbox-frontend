import humps from 'humps'

import ApiHelpers from './_api_helpers'

import * as types from 'constants/members-action-types'

import { CALL_API, getJSON } from 'redux-api-middleware'

const membersEndpoint = (orgId) => `/api/organizations/${orgId}/members`
const memberEndpoint = (orgId, memberId) => `/api/organizations/${orgId}/members/${memberId}`

export function loadMembers(organizationId) {
  return {
    [CALL_API]: {
      endpoint: ApiHelpers.formatUrl(membersEndpoint(organizationId)),
      method:   'GET',
      headers:  ApiHelpers.headers,
      types: [
        types.LOAD_MEMBERS_REQUEST,
        {
          type: types.LOAD_MEMBERS_SUCCESS,
          payload: (action, state, res) => {
            return getJSON(res).then((json) => ({ members: humps.camelizeKeys(json) }))
          }
        },
        {
          type: types.LOAD_MEMBERS_FAILURE,
          payload: ApiHelpers.failurePayload
        }
      ]
    }
  }
}
