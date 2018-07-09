import { takeEvery, takeLatest, call, put } from 'redux-saga/effects';

import {
  getOrganizationCategories,
  getOrganizationCategory,
  postOrganizationCategory,
  putOrganizationCategory,
  deleteOrganizationCategory,
} from './api.js';

import {
  loadCategories,
  loadCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from './actions.js';

function* handleLoadCategories({ payload: { organizationId }, meta: { resolve, reject } }) {
  try {
    yield put(loadCategories.request(organizationId));
    const categories = yield call(getOrganizationCategories, organizationId);
    yield put(loadCategories.success(organizationId, categories));
    yield call(resolve, categories);
  } catch (error) {
    yield put(loadCategories.failure(error));
    yield call(reject, error);
  }
}

function* handleLoadCategory({ payload: { organizationId, categoryId } }) {
  try {
    yield put(loadCategory.request(organizationId, categoryId));
    const category = yield call(getOrganizationCategory, organizationId, categoryId);
    yield put(loadCategory.success(organizationId, category));
  } catch (error) {
    yield put(loadCategory.failure(error));
  }
}

function* handleCreateCategory({ payload: { organizationId, data }, meta: { resolve, reject } }) {
  try {
    yield put(createCategory.request(organizationId));
    const category = yield call(postOrganizationCategory, organizationId, data);
    yield put(createCategory.success(organizationId, category));
    yield call(resolve, category);
  } catch (error) {
    yield put(createCategory.failure(error));
    yield call(reject, error);
  }
}

function* handleUpdateCategory({ payload: { organizationId, categoryId, data }, meta: { resolve, reject } }) {
  try {
    yield put(updateCategory.request(organizationId, categoryId));
    const category = yield call(putOrganizationCategory, organizationId, categoryId, data);
    yield put(updateCategory.success(organizationId, categoryId, category));
    yield call(resolve, category);
  } catch (error) {
    yield put(updateCategory.failure(error));
    yield call(reject, error);
  }
}

function* handleDeleteCategory({ payload: { organizationId, categoryId }, meta: { resolve, reject } }) {
  try {
    yield put(deleteCategory.request(organizationId, categoryId));
    const category = yield call(deleteOrganizationCategory, organizationId, categoryId);
    yield put(deleteCategory.success(organizationId, category));
    yield call(resolve, category);
  } catch (error) {
    yield put(deleteCategory.failure(error));
    yield call(reject, error);
  }
}

export default function* () {
  yield takeLatest(loadCategories, handleLoadCategories);
  yield takeLatest(loadCategory,   handleLoadCategory);
  yield takeEvery(createCategory, handleCreateCategory);
  yield takeEvery(updateCategory, handleUpdateCategory);
  yield takeEvery(deleteCategory, handleDeleteCategory);
}
