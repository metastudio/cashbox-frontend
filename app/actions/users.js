import humps from 'humps'

import ApiHelpers from './_api_helpers'

import * as types from 'constants/users-action-types'

import { CALL_API, getJSON } from 'redux-api-middleware'

const USERS_ENDPOINT = '/api/v1/users'

export function loadCurrentUser() {
  return {
    [CALL_API]: {
      endpoint: ApiHelpers.formatUrl(USERS_ENDPOINT + '/current'),
      method:   'GET',
      headers:  ApiHelpers.headers,
      types: [
        types.LOAD_CURRENT_USER_REQUEST,
        {
          type: types.LOAD_CURRENT_USER_SUCCESS,
          payload: (action, state, res) => {
            return getJSON(res).then((json) => ({ user: humps.camelizeKeys(json) }))
          }
        },
        {
          type: types.LOAD_CURRENT_USER_FAILURE,
          payload: ApiHelpers.failurePayload
        }
      ]
    }
  }
}
