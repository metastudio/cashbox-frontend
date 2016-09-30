import * as types from 'constants/organizations-action-types'

const defaultState = {
  current: null,
}

export default (state = defaultState, action) => {
  const { type, payload } = action

  switch(type) {
    case types.SET_CURRENT_ORGANIZATION_REQUEST:
      return {
        ...state,
        current: null,
      }
    case types.SET_CURRENT_ORGANIZATION_SUCCESS:
      return {
        ...state,
        current: payload.organization,
      }
    case types.SET_CURRENT_ORGANIZATION_FAILURE:
      return {
        ...state,
        current: null,
      }
    default:
      return state
  }
}
