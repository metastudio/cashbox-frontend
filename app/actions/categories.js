import humps from 'humps'

import ApiHelpers from './_api_helpers'

import * as types from 'constants/categories-action-types'

import { CALL_API, getJSON } from 'redux-api-middleware'

const categoriesEndpoint = (orgId) => `/api/organizations/${orgId}/categories`
const categoryEndpoint = (orgId, categoryId) => `/api/organizations/${orgId}/categories/${categoryId}`

export function loadCategories(organizationId) {
  return {
    [CALL_API]: {
      endpoint: ApiHelpers.formatUrl(categoriesEndpoint(organizationId)),
      method:   'GET',
      headers:  ApiHelpers.headers,
      types: [
        types.LOAD_CATEGORIES_REQUEST,
        {
          type: types.LOAD_CATEGORIES_SUCCESS,
          payload: (action, state, res) => {
            return getJSON(res).then((json) => ({ categories: humps.camelizeKeys(json) }))
          }
        },
        {
          type: types.LOAD_CATEGORIES_FAILURE,
          payload: ApiHelpers.failurePayload
        }
      ]
    }
  }
}

export function createCategory(organizationId, data) {
  return {
    [CALL_API]: {
      endpoint: ApiHelpers.formatUrl(categoriesEndpoint(organizationId)),
      method:   'POST',
      headers:  ApiHelpers.headers,
      body:     ApiHelpers.formatJsonBody({ category: data }),
      types: [
        types.CREATE_CATEGORY_REQUEST,
        {
          type: types.CREATE_CATEGORY_SUCCESS,
          payload: (action, state, res) => {
            return getJSON(res).then((json) => ({ category: humps.camelizeKeys(json) }))
          }
        },
        {
          type: types.CREATE_CATEGORY_FAILURE,
          payload: ApiHelpers.failurePayload
        }
      ]
    }
  }
}

export function loadCategory(organizationId, categoryId) {
  return {
    [CALL_API]: {
      endpoint: ApiHelpers.formatUrl(categoryEndpoint(organizationId, categoryId)),
      method:   'GET',
      headers:  ApiHelpers.headers,
      types: [
        types.LOAD_CATEGORY_REQUEST,
        {
          type: types.LOAD_CATEGORY_SUCCESS,
          payload: (action, state, res) => {
            return getJSON(res).then((json) => ({ category: humps.camelizeKeys(json) }))
          }
        },
        {
          type: types.LOAD_CATEGORY_FAILURE,
          payload: ApiHelpers.failurePayload
        }
      ]
    }
  }
}

export function updateCategory(organizationId, categoryId, data) {
  return {
    [CALL_API]: {
      endpoint: ApiHelpers.formatUrl(categoryEndpoint(organizationId, categoryId)),
      method:   'PUT',
      headers:  ApiHelpers.headers,
      body:     ApiHelpers.formatJsonBody({ category: data }),
      types: [
        types.UPDATE_CATEGORY_REQUEST,
        {
          type: types.UPDATE_CATEGORY_SUCCESS,
          payload: (action, state, res) => {
            return getJSON(res).then((json) => ({ category: humps.camelizeKeys(json) }))
          }
        },
        {
          type: types.UPDATE_CATEGORY_FAILURE,
          payload: ApiHelpers.failurePayload
        }
      ]
    }
  }
}

export function deleteCategory(organizationId, categoryId) {
  return {
    [CALL_API]: {
      endpoint: ApiHelpers.formatUrl(categoryEndpoint(organizationId, categoryId)),
      method:   'DELETE',
      headers:  ApiHelpers.headers,
      types: [
        types.DELETE_CATEGORY_REQUEST,
        {
          type: types.DELETE_CATEGORY_SUCCESS,
          payload: (action, state, res) => {
            return getJSON(res).then((json) => ({ category: humps.camelizeKeys(json) }))
          }
        },
        {
          type: types.DELETE_CATEGORY_FAILURE,
          payload: ApiHelpers.failurePayload
        }
      ]
    }
  }
}

export function clearCategory() {
  return {
    type: types.CLEAR_CATEGORY,
  }
}
