import { CategoryType, ICategoriesState, ICategoryState } from './types';

interface IStateWithCategories {
  categories: ICategoriesState;
}
interface IStateWithCategory {
  category: ICategoryState;
}

const selectCategoriesStatus = (state: IStateWithCategories) => state.categories.status;
const selectCategories = (state: IStateWithCategories, type?: CategoryType) => {
  if (!type) { return state.categories.items; }
  return state.categories.items && state.categories.items.filter(c => c.type === type);
};

const selectCategoryStatus = (state: IStateWithCategory) => state.category.status;
const selectCategory       = (state: IStateWithCategory) => state.category.data;

export {
  selectCategoriesStatus,
  selectCategories,
  selectCategoryStatus,
  selectCategory,
};
