import { handleActions } from 'redux-actions'

import * as statuses from 'constants/statuses'
import { loadCategories, deleteCategory } from 'actions'

const defaultState = {
  items:  [],
  status: statuses.INVALID,
  error:  null,
}

export default handleActions({
  [loadCategories.request]: (state) => ({
    ...state,
    items:  [],
    status: statuses.PENDING,
    error:  null,
  }),
  [loadCategories.success]: (state, { payload }) => ({
    ...state,
    items:  payload.categories,
    status: statuses.SUCCESS,
    error:  null,
  }),
  [loadCategories.failure]: (state, { payload }) => ({
    ...state,
    items:  [],
    status: statuses.FAILURE,
    error:  payload
  }),
  [deleteCategory.success]: (state, { payload }) => ({
    ...state,
    items:  state.items.filter((item) => item.id != payload.category.id),
    status: statuses.SUCCESS,
    error:  null
  }),
}, defaultState)
