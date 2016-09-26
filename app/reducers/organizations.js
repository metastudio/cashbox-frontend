import * as types from 'constants/organizations-action-types'

const defaultState = {
  current: null,
  organizations: []
}

export default (state = defaultState, action) => {
  const { type, payload } = action

  switch(type) {
    case types.SESSION_CURRENT_ORGANIZATION_REQUEST:
    case types.LOAD_ORGANIZATION_REQUEST:
      return {
        ...state,
        current: null,
      }
    case types.SESSION_CURRENT_ORGANIZATION_SUCCESS:
    case types.LOAD_ORGANIZATION_SUCCESS:
      return {
        ...state,
        current: payload.organization,
      }
    case types.SESSION_CURRENT_ORGANIZATION_FAILURE:
    case types.LOAD_ORGANIZATION_FAILURE:
      return {
        ...state,
        current: null,
      }
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
