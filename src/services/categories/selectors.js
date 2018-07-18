const selectCategories       = (state) => state.categories.items;
const selectCategoriesStatus = (state) => state.categories.status;

const selectTypedCategories = (state, type) => (
  type && state.categories.items.filter(c => c.type === type) || state.categories.items
);

const selectCategoryStatus = (state) => state.category.status;
const selectCategory       = (state) => state.category.data;

export {
  selectCategoriesStatus,
  selectCategories,
  selectTypedCategories,

  selectCategoryStatus,
  selectCategory,
};
