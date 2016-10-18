import * as types from 'constants/members-action-types'
import * as statuses from 'constants/statuses'

const defaultState = {
  items:  [],
  status: statuses.INVALID,
  error:  null,
}

export default (state = defaultState, action) => {
  const { type, payload } = action

  switch(type) {
    case types.LOAD_MEMBERS_REQUEST:
      return {
        ...state,
        items:  [],
        status: statuses.PENDING,
        error:  null,
      }
    case types.LOAD_MEMBERS_SUCCESS:
      return {
        ...state,
        items:  payload.members,
        status: statuses.SUCCESS,
        error:  null,
      }
    case types.LOAD_MEMBERS_FAILURE:
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
