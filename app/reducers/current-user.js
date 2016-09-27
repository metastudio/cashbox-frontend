import * as types from 'constants/organizations-action-types'

const defaultState = {
  organizations: []
}

export default (state = defaultState, action) => {
  const { type, payload } = action

  switch(type) {
    case types.LOAD_ORGANIZATIONS_REQUEST:
      return {
        ...state,
        organizations: []
      }
    case types.LOAD_ORGANIZATIONS_SUCCESS:
      return {
        ...state,
        organizations: payload.organizations,
      }
    case types.LOAD_ORGANIZATIONS_FAILURE:
      return {
        ...state,
        organizations: []
      }
    default:
      return state
  }
}
