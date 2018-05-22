import { handleActions } from 'redux-actions';

import * as statuses from 'constants/statuses.js';
import {
  loadCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from 'actions/categories.js';

const defaultState = {
  items:  [],
  status: statuses.INVALID,
  error:  null,
};

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
  [createCategory.success]: (state) => ({
    ...state,
    status: statuses.INVALID,
  }),
  [updateCategory.success]: (state, { payload }) => ({
    ...state,
    items:  state.items.map((c) => c.id === payload.category.id ? payload.category : c),
  }),
  [deleteCategory.success]: (state, { payload }) => ({
    ...state,
    items:  state.items.filter((c) => c.id !== payload.category.id),
  }),
}, defaultState);
