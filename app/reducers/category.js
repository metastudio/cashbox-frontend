import * as types from 'constants/categories-action-types'
import * as statuses from 'constants/statuses'

const defaultState = {
  current: null,
  status:  statuses.INVALID,
  error:   null,
}

export default (state = defaultState, action) => {
  const { type, payload } = action

  switch(type) {
    case types.LOAD_CATEGORY_REQUEST:
      return {
        ...state,
        current: null,
        status:  statuses.PENDING,
        error:   null,
      }
    case types.LOAD_CATEGORY_SUCCESS:
      return {
        ...state,
        current: payload.category,
        status:  statuses.SUCCESS,
        error:   null,
      }
    case types.LOAD_CATEGORY_FAILURE:
      return {
        ...state,
        current: null,
        status:  statuses.FAILURE,
        error:   payload,
      }
    case types.CLEAR_CATEGORY:
      return {
        ...state,
        current: null,
        status:  statuses.INVALID,
        error:   null,
      }
    default:
      return state
  }
}
