import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'

import { ValidationError } from 'api/errors'
import {
  getOrganizationCategories,
  getOrganizationCategory,
  postOrganizationCategory,
  putOrganizationCategory,
  deleteOrganizationCategory,
} from 'api'

import {
  loadCategories,
  loadCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from 'actions'

function* handleLoadCategories({ payload: { organizationId }}) {
  try {
    yield put(loadCategories.request(organizationId))
    const categories = yield call(getOrganizationCategories, organizationId)
    yield put(loadCategories.success(organizationId, categories))
  } catch (error) {
    yield put(loadCategories.failure(error))
  }
}

function* handleLoadCategory({ payload: { organizationId, categoryId }, meta: { resolve, reject } }) {
  try {
    yield put(loadCategory.request(organizationId, categoryId))
    const category = yield call(getOrganizationCategory, organizationId, categoryId)
    yield put(loadCategory.success(organizationId, category))
    yield call(resolve, category)
  } catch (error) {
    yield put(loadCategory.failure(error))
    yield call(reject, error)
  }
}

function* handleCreateCategory({ payload: { organizationId, data }, meta: { resolve, reject } }) {
  try {
    yield put(createCategory.request(organizationId))
    const category = yield call(postOrganizationCategory, organizationId, data)
    yield put(createCategory.success(organizationId, category))
    yield call(resolve, category)
  } catch (error) {
    yield put(createCategory.failure(error))
    const errors = error instanceof ValidationError ? error.errors : { _error: error.message }
    yield call(reject, errors)
  }
}

function* handleUpdateCategory({ payload: { organizationId, categoryId, data }, meta: { resolve, reject } }) {
  try {
    yield put(updateCategory.request(organizationId, categoryId))
    const category = yield call(putOrganizationCategory, organizationId, categoryId, data)
    yield put(updateCategory.success(organizationId, categoryId, category))
    yield call(resolve, category)
  } catch (error) {
    yield put(updateCategory.failure(error))
    const errors = error instanceof ValidationError ? error.errors : { _error: error.message }
    yield call(reject, errors)
  }
}

function* handleDeleteCategory({ payload: { organizationId, categoryId }, meta: { resolve, reject } }) {
  try {
    yield put(deleteCategory.request(organizationId, categoryId))
    const category = yield call(deleteOrganizationCategory, organizationId, categoryId)
    yield put(deleteCategory.success(organizationId, category))
    yield call(resolve, category)
  } catch (error) {
    yield put(deleteCategory.failure(error))
    yield call(reject, error)
  }
}

export default function* () {
  yield takeEvery(loadCategories.toString(), handleLoadCategories)
  yield takeEvery(loadCategory.toString(), handleLoadCategory)
  yield takeEvery(createCategory.toString(), handleCreateCategory)
  yield takeEvery(updateCategory.toString(), handleUpdateCategory)
  yield takeEvery(deleteCategory.toString(), handleDeleteCategory)
}
