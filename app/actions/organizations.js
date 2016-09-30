import humps from 'humps'

import ApiHelpers from './_api_helpers'

import * as types from 'constants/organizations-action-types'

import { CALL_API, getJSON } from 'redux-api-middleware'
import { getCookies, setCookies } from 'utils/cookies'

const ORGANIZATIONS_ENDPOINT = '/api/organizations'

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
          payload: ApiHelpers.failurePayload
        }
      ]
    }
  }
}

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

export function loadOrganization(organizationId) {
  return {
    [CALL_API]: {
      endpoint: ApiHelpers.formatUrl(ORGANIZATIONS_ENDPOINT + '/' + organizationId),
      method:   'GET',
      headers:  ApiHelpers.headers,
      types: [
        types.LOAD_ORGANIZATION_REQUEST,
        {
          type: types.LOAD_ORGANIZATION_SUCCESS,
          payload: (action, state, res) => {
            return getJSON(res).then((json) => ({ organization: humps.camelizeKeys(json) }))
          }
        },
        {
          type: types.LOAD_ORGANIZATION_FAILURE,
          payload: ApiHelpers.failurePayload
        }
      ]
    }
  }
}

export function setCurrentOrganization(organizationId) {
  return (dispatch) => {
    dispatch({ type: types.SET_CURRENT_ORGANIZATION_REQUEST })
    return dispatch(loadOrganization(organizationId)).then((actionResponse) => {
      if (actionResponse.error) {
        return dispatch({ ...actionResponse, type: types.SET_CURRENT_ORGANIZATION_FAILURE })
      }
      const currentOrganizationId = actionResponse.payload.organization.id
      setCookies({ currentOrganizationId: currentOrganizationId })
      return dispatch({ type: types.SET_CURRENT_ORGANIZATION_SUCCESS, payload: { organization: actionResponse.payload.organization } })
    })
  }
}

export function restoreCurrentOrganization() {
  return (dispatch) => {
    dispatch({ type: types.SET_CURRENT_ORGANIZATION_REQUEST })
    const currentOrganizationId = getCookies().currentOrganizationId
    if (currentOrganizationId) {
      return dispatch(loadOrganization(currentOrganizationId)).then((actionResponse) => {
        if (actionResponse.error) {
          return dispatch({ ...actionResponse, type: types.SET_CURRENT_ORGANIZATION_FAILURE })
        }

        return dispatch({ type: types.SET_CURRENT_ORGANIZATION_SUCCESS, payload: { organization: actionResponse.payload.organization } })
      })
    } else {
      return dispatch({ type: types.SET_CURRENT_ORGANIZATION_FAILURE, error: true, payload: {_error: 'Current organization not found'} })
    }
  }
}
