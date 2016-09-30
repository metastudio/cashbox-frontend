import * as types from 'constants/organizations-action-types'
import * as statuses from 'constants/statuses'

const defaultState = {
  items:  [],
  status: statuses.INVALID,
  error:  null,
}

export default (state = defaultState, action) => {
  const { type, payload, error } = action

  switch(type) {
    case types.LOAD_ORGANIZATIONS_REQUEST:
      return {
        ...state,
        items:  [],
        status: statuses.PENDING,
        error:  null,
      }
    case types.LOAD_ORGANIZATIONS_SUCCESS:
      return {
        ...state,
        items:  payload.organizations,
        status: statuses.SUCCESS,
        error:  null,
      }
    case types.LOAD_ORGANIZATIONS_FAILURE:
      return {
        ...state,
        items:  [],
        status: statuses.FAILURE,
        error:  payload
      }
    default:
      return state
  }
}
