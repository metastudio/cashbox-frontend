import * as types from 'constants/auth-action-types'

const defaultState = {
  isSessionLoaded: false
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case types.SESSION_RESTORE_REQUEST:
      return {
        ...state,
        isSessionLoaded: false
      }
    case types.SESSION_RESTORE_SUCCESS:
      return {
        ...state,
        isSessionLoaded: true
      }
    case types.SESSION_RESTORE_FAILURE:
      return {
        ...state,
        isSessionLoaded: true
      }
    default:
      return state
  }
}

