import * as types from 'constants/auth-action-types'

const defaultState = {
  token:  null,
  user:   null,
}

export default (state = defaultState, action) => {
  const { type, payload } = action

  switch(type) {
    case types.RESTORE_USER_REQUEST:
    case types.LOGIN_REQUEST:
      return {
        ...state,
        token: null,
        user: null,
      }
    case types.RESTORE_USER_SUCCESS:
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        token:  payload.token,
        user:   payload.user,
      }
    case types.RESTORE_USER_FAILURE:
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
