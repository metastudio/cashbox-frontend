import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { ActionType, getType } from 'typesafe-actions';

import {
  createCategory,
  deleteCategory,
  loadCategories,
  loadCategory,
  updateCategory,
} from './actions';
import {
  deleteOrganizationCategory,
  getOrganizationCategories,
  getOrganizationCategory,
  postOrganizationCategory,
  putOrganizationCategory,
} from './api';

function* handleLoadCategories(
  { payload: { orgId } }: ActionType<typeof loadCategories.request>,
) {
  try {
    const categories = yield call(getOrganizationCategories, orgId);
    yield put(loadCategories.success(orgId, categories));
  } catch (error) {
    yield put(loadCategories.failure(error));
  }
}

function* handleLoadCategory(
  { payload: { orgId, categoryId } }: ActionType<typeof loadCategory.request>,
) {
  try {
    const category = yield call(getOrganizationCategory, orgId, categoryId);
    yield put(loadCategory.success(orgId, category));
  } catch (error) {
    yield put(loadCategory.failure(error));
  }
}

function* handleCreateCategory(
  {
    payload: { orgId, data },
    meta:    { resolve, reject },
  }: ActionType<typeof createCategory.request>,
) {
  try {
    const category = yield call(postOrganizationCategory, orgId, data);
    yield put(createCategory.success(orgId, category));
    yield call(resolve, category);
  } catch (error) {
    yield put(createCategory.failure(error));
    yield call(reject, error);
  }
}

function* handleUpdateCategory(
  {
    payload: { orgId, categoryId, data },
    meta:    { resolve, reject },
  }: ActionType<typeof updateCategory.request>,
) {
  try {
    const category = yield call(putOrganizationCategory, orgId, categoryId, data);
    yield put(updateCategory.success(orgId, category));
    yield call(resolve, category);
  } catch (error) {
    yield put(updateCategory.failure(error));
    yield call(reject, error);
  }
}

function* handleDeleteCategory(
  {
    payload: { orgId, categoryId },
    meta:    { resolve, reject },
  }: ActionType<typeof deleteCategory.request>,
) {
  try {
    const category = yield call(deleteOrganizationCategory, orgId, categoryId);
    yield put(deleteCategory.success(orgId, category));
    yield call(resolve, category);
  } catch (error) {
    yield put(deleteCategory.failure(error));
    yield call(reject, error);
  }
}

export default function* () {
  yield takeLatest(getType(loadCategories.request), handleLoadCategories);
  yield takeLatest(getType(loadCategory.request),   handleLoadCategory);
  yield takeEvery(getType(createCategory.request), handleCreateCategory);
  yield takeEvery(getType(updateCategory.request), handleUpdateCategory);
  yield takeEvery(getType(deleteCategory.request), handleDeleteCategory);
}
