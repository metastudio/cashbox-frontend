import * as types from 'constants/auth-action-types'

const defaultState = {
  token:  null,
  user:   null,
}

export default (state = defaultState, action) => {
  const { type, payload } = action

  switch(type) {
    case types.SESSION_RESTORE_REQUEST:
    case types.LOGIN_REQUEST:
      return {
        ...state,
        token: null,
        user: null,
      }
    case types.SESSION_RESTORE_SUCCESS:
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        token:  payload.token,
        user:   payload.user,
      }
    case types.SESSION_RESTORE_FAILURE:
    case types.LOGIN_FAILURE:
      return {
        ...state,
        token:  null,
        user:   null,
      }
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        token:  null,
        user:   null,
      }
    default:
      return state
  }
}
