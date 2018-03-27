import { createAction } from 'redux-actions'
import { noop } from 'lodash'

export const loadCategories = createAction('LOAD_CATEGORIES', (organizationId) => ({ organizationId }))
loadCategories.request = createAction('LOAD_CATEGORIES_REQUEST', (organizationId) => ({ organizationId }))
loadCategories.success = createAction('LOAD_CATEGORIES_SUCCESS', (organizationId, categories) => ({ organizationId, categories }))
loadCategories.failure = createAction('LOAD_CATEGORIES_FAILURE')

export const createCategory = createAction('CREATE_CATEGORY', (organizationId, data) => ({ organizationId, data }), (_organizationId, _data, resolve = noop, reject = noop) => ({ resolve, reject }))
createCategory.request = createAction('CREATE_CATEGORY_REQUEST', (organizationId) => ({ organizationId }))
createCategory.success = createAction('CREATE_CATEGORY_SUCCESS', (organizationId, category) => ({ organizationId, category }))
createCategory.failure = createAction('CREATE_CATEGORY_FAILURE')

export const loadCategory = createAction('LOAD_CATEGORY', (organizationId, categoryId) => ({ organizationId, categoryId }))
loadCategory.request = createAction('LOAD_CATEGORY_REQUEST', (organizationId, categoryId) => ({ organizationId, categoryId }))
loadCategory.success = createAction('LOAD_CATEGORY_SUCCESS', (organizationId, category) => ({ organizationId, category }))
loadCategory.failure = createAction('LOAD_CATEGORY_FAILURE')

export const updateCategory = createAction('UPDATE_CATEGORY', (organizationId, categoryId, data) => ({ organizationId, categoryId, data }), (_organizationId, _data, resolve = noop, reject = noop) => ({ resolve, reject }))
updateCategory.request = createAction('UPDATE_CATEGORY_REQUEST', (organizationId, categoryId) => ({ organizationId, categoryId }))
updateCategory.success = createAction('UPDATE_CATEGORY_SUCCESS', (organizationId, category) => ({ organizationId, category }))
updateCategory.failure = createAction('UPDATE_CATEGORY_FAILURE')

export const deleteCategory = createAction('DELETE_CATEGORY', (organizationId, categoryId) => ({ organizationId, categoryId }), (_organizationId, _categoryId, resolve = noop, reject = noop) => ({ resolve, reject }))
deleteCategory.request = createAction('DELETE_CATEGORY_REQUEST', (organizationId, categoryId) => ({ organizationId, categoryId }))
deleteCategory.success = createAction('DELETE_CATEGORY_SUCCESS', (organizationId, category) => ({ organizationId, category }))
deleteCategory.failure = createAction('DELETE_CATEGORY_FAILURE')

export const clearCategory = createAction('CLEAR_CATEGORY')
