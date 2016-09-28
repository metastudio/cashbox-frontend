import { CALL_API, getJSON } from 'redux-api-middleware'

import ApiHelpers from './_api_helpers'

import { getCookies, setCookies, clearCookies } from 'utils/cookies'
import { loadCurrentUser, restoreCurrentOrganization } from 'actions'

import * as types from 'constants/auth-action-types'

function getToken(email, password) {
  return {
    [CALL_API]: {
      endpoint: ApiHelpers.formatUrl('/api/auth_token'),
      method:   'POST',
      headers:  ApiHelpers.headers,
      body:     ApiHelpers.formatJsonBody({ auth: { email: email || '', password: password || ''} }),
      types: [
        types.GET_TOKEN_REQUEST,
        {
          type: types.GET_TOKEN_SUCCESS,
          payload: (action, state, res) => {
            return getJSON(res).then((json) => ({ token: json.jwt }))
          }
        },
        {
          type: types.GET_TOKEN_FAILURE,
          payload: (action, state, res) => {
            return {_error: (res.status == 401 ? 'Invalid login or password' : res.statusText) }
          }
        }
      ]
    }
  }
}

export function loginUser(email, password) {
  return (dispatch) => {
    dispatch({ type: types.LOGIN_REQUEST })
    return dispatch(getToken(email, password)).then((actionResponse) => {
      if (actionResponse.error) {
        return dispatch({ ...actionResponse, type: types.LOGIN_FAILURE })
      }

      const token = actionResponse.payload.token
      setCookies({ token: token })
      return dispatch(loadCurrentUser()).then((actionResponse) => {
        if (actionResponse.error) {
          return dispatch({ ...actionResponse, type: types.LOGIN_FAILURE })
        }
        return dispatch({ type: types.LOGIN_SUCCESS, payload: { token: token, user: actionResponse.payload.user } })
      })
    })
  }
}

export function restoreUser() {
  return (dispatch) => {
    dispatch({ type: types.USER_RESTORE_REQUEST })
    const token = getCookies().token
    if (token) {
      return dispatch(loadCurrentUser()).then((actionResponse) => {
        if (actionResponse.error) {
          return dispatch({ ...actionResponse, type: types.USER_RESTORE_FAILURE })
        }

        return dispatch({ type: types.USER_RESTORE_SUCCESS, payload: { token: token, user: actionResponse.payload.user } })
      })
    } else {
      return dispatch({ type: types.USER_RESTORE_FAILURE, error: true, payload: {_error: 'Token not found'} })
    }
  }
}

export function restoreSession() {
  return (dispatch) => {
    dispatch({ type: types.SESSION_RESTORE_REQUEST })

    return dispatch(restoreUser()).then((actionResponse) => {
      if (actionResponse.error) {
        return dispatch({ ...actionResponse, type: types.SESSION_RESTORE_FAILURE })
      }
      const token = actionResponse.payload.token
      const user  = actionResponse.payload.user
      return dispatch(restoreCurrentOrganization()).then((actionResponse) => {
        if (actionResponse.error) {
          return dispatch({ ...actionResponse, type: types.SESSION_RESTORE_FAILURE })
        }
        return dispatch({ type: types.SESSION_RESTORE_SUCCESS, payload: { token: token, user: user, currentOrganizationId: actionResponse.payload.organization.id } })
      })
    })

  }
}

export function logoutUser() {
  clearCookies()

  return {
    type: types.LOGOUT_SUCCESS,
  }
}

