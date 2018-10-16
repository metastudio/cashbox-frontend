import { ActionType, getType } from 'typesafe-actions';

import { Status } from 'model-types';
import { setCurrentOrganization } from 'services/organizations/actions';

import {
  createCategory,
  deleteCategory,
  loadCategories,
  updateCategory,
} from '../actions';
import { ICategoriesState } from '../types';

const defaultState: ICategoriesState = {
  items:  [],
  status: Status.Invalid,
  error:  null,
};

function categoriesReducer(
  state: ICategoriesState = defaultState,
  action: ActionType<
    | typeof loadCategories
    | typeof createCategory.success
    | typeof updateCategory.success
    | typeof deleteCategory.success
    | typeof setCurrentOrganization.success
  >,
): ICategoriesState {
  switch (action.type) {
    case getType(loadCategories.request):
      return {
        ...state,
        status: Status.Pending,
        error:  null,
      };
    case getType(loadCategories.success):
      return {
        ...state,
        items:  action.payload.categories,
        status: Status.Success,
        error:  null,
      };
    case getType(loadCategories.failure):
      return {
        ...state,
        status: Status.Failure,
        error:  action.payload,
      };
    case getType(createCategory.success):
      return {
        ...state,
        status: Status.Invalid,
      };
    case getType(updateCategory.success):
      return {
        ...state,
        items: state.items.map(c => c.id === action.payload.category.id ? action.payload.category : c),
      };
    case getType(deleteCategory.success):
      return {
        ...state,
        items: state.items.filter(c => c.id !== action.payload.category.id),
      };
    case getType(setCurrentOrganization.success):
      return {
        ...state,
        ...defaultState,
      };
    default:
      return state;
  }
}

export default categoriesReducer;
