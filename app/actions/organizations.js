import humps from 'humps'

import ApiHelpers from './_api_helpers'

import * as types from 'constants/organizations-action-types'

import { CALL_API, getJSON } from 'redux-api-middleware'

const ORGANIZATIONS_ENDPOINT = '/api/organizations'

export function createOrganization(name, default_currency) {
  return {
    [CALL_API]: {
      endpoint: ApiHelpers.formatUrl(ORGANIZATIONS_ENDPOINT),
      method:   'POST',
      headers:  ApiHelpers.headers,
      body:     ApiHelpers.formatJsonBody({ organization: { name: name || '', default_currency: default_currency || ''} }),
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
          payload: (action, state, res) => {
            return {_error: (res.status != 201 ? 'Invalid data' : res.statusText) }
          }
        }
      ]
    }
  }
}

export function loadOrganizations() {
  return {
    [CALL_API]: {
      endpoint: ApiHelpers.formatUrl(ORGANIZATIONS_ENDPOINT),
      method:   'GET',
      headers:  ApiHelpers.headers,
      types: [
        types.LOAD_ORGANIZATIONS_REQUEST,
        {
          type: types.LOAD_ORGANIZATIONS_SUCCESS,
          payload: (action, state, res) => {
            return getJSON(res).then((json) => ({ organizations: humps.camelizeKeys(json) }))
          }
        },
        {
          type: types.LOAD_ORGANIZATIONS_FAILURE,
          payload: (action, state, res) => {
            return {_error: (res.status != 200 ? 'Invalid data' : res.statusText) }
          }
        }
      ]
    }
  }
}
