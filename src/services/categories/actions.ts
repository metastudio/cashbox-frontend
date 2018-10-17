import { noop } from 'lodash';
import { createAction } from 'typesafe-actions';

import { ID } from 'model-types';
import { ICategory, ICategoryParams } from './types';

const loadCategories = {
  request: createAction(
    'LOAD_CATEGORIES_REQUEST',
    (res) => {
      return (orgId: ID) => res({ orgId });
    },
  ),
  success: createAction(
    'LOAD_CATEGORIES_SUCCESS',
    (resolve) => {
      return (orgId: ID, categories: ICategory[]) => resolve({ orgId, categories });
    },
  ),
  failure: createAction(
    'LOAD_CATEGORIES_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

const loadCategory = {
  request: createAction(
    'LOAD_CATEGORY_REQUEST',
    (resolve) => {
      return (orgId: ID, categoryId: ID) => resolve({ orgId, categoryId });
    },
  ),
  success: createAction(
    'LOAD_CATEGORY_SUCCESS',
    (resolve) => {
      return (orgId: ID, category: ICategory) => resolve({ orgId, category });
    },
  ),
  failure: createAction(
    'LOAD_CATEGORY_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

const createCategory = {
  request: createAction(
    'CREATE_CATEGORY_REQUEST',
    (res) => {
      return (
        orgId:   ID,
        data:    ICategoryParams,
        resolve: ((category: ICategory) => void) = noop,
        reject:  ((error: Error) => void)        = noop,
      ) => res(
        { orgId, data },
        { resolve, reject },
      );
    },
  ),
  success: createAction(
    'CREATE_CATEGORY_SUCCESS',
    (resolve) => {
      return (orgId: ID, category: ICategory) => resolve({ orgId, category });
    },
  ),
  failure: createAction(
    'CREATE_CATEGORY_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

const updateCategory = {
  request: createAction(
    'UPDATE_CATEGORY_REQUEST',
    (res) => {
      return (
        orgId:      ID,
        categoryId: ID,
        data:       ICategoryParams,
        resolve:    ((category: ICategory) => void) = noop,
        reject:     ((error: Error) => void)        = noop,
      ) => res(
        { orgId, categoryId, data },
        { resolve, reject },
      );
    },
  ),
  success: createAction(
    'UPDATE_CATEGORY_SUCCESS',
    (resolve) => {
      return (orgId: ID, category: ICategory) => resolve({ orgId, category });
    },
  ),
  failure: createAction(
    'UPDATE_CATEGORY_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

const deleteCategory = {
  request: createAction(
    'DELETE_CATEGORY_REQUEST',
    (res) => {
      return (
        orgId:      ID,
        categoryId: ID,
        resolve:    ((category: ICategory) => void) = noop,
        reject:     ((error: Error) => void)        = noop,
      ) => res(
        { orgId, categoryId },
        { resolve, reject },
      );
    },
  ),
  success: createAction(
    'DELETE_CATEGORY_SUCCESS',
    (resolve) => {
      return (orgId: ID, category: ICategory) => resolve({ orgId, category });
    },
  ),
  failure: createAction(
    'DELETE_CATEGORY_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

export {
  loadCategories,
  loadCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
