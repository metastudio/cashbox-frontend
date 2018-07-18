const selectCategoriesStatus = (state) => state.categories.status;
const selectCategories = (state, type) => {
  if (!type) { return state.categories.items }
  return state.categories.items && state.categories.items.filter(c => c.type === type)
};

const selectCategoryStatus = (state) => state.category.status;
const selectCategory       = (state) => state.category.data;

export {
  selectCategoriesStatus,
  selectCategories,
  selectCategoryStatus,
  selectCategory,
};
