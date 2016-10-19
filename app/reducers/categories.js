import * as types from 'constants/categories-action-types'
import * as statuses from 'constants/statuses'

const defaultState = {
  items:  [],
  status: statuses.INVALID,
  error:  null,
}

export default (state = defaultState, action) => {
  const { type, payload } = action

  switch(type) {
    case types.LOAD_CATEGORIES_REQUEST:
      return {
        ...state,
        items:  [],
        status: statuses.PENDING,
        error:  null,
      }
    case types.LOAD_CATEGORIES_SUCCESS:
      return {
        ...state,
        items:  payload.categories,
        status: statuses.SUCCESS,
        error:  null,
      }
    case types.LOAD_CATEGORIES_FAILURE:
      return {
        ...state,
        items:  [],
        status: statuses.FAILURE,
        error:  payload
      }
    case types.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        items:  state.items.filter((item) => item.id != payload.category.id),
        status: statuses.SUCCESS,
        error:  null,
      }
    default:
      return state
  }
}
