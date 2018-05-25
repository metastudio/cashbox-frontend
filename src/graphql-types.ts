/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface CategoryInput {
  type: string,
  name: string,
};

export interface GetCategoryQueryVariables {
  orgId: string,
  categoryId: string,
};

export interface GetCategoryQuery {
  // Find an Organization by ID
  organization:  {
    __typename: "Organization",
    // Find a Category by ID within organization
    category:  {
      __typename: "Category",
      id: string,
      name: string,
      type: string,
    } | null,
  } | null,
};

export interface UpdateCategoryMutationVariables {
  categoryId: string,
  category: CategoryInput,
};

export interface UpdateCategoryMutation {
  // Update category
  updateCategory:  {
    __typename: "Category",
    id: string,
    type: string,
    name: string,
  } | null,
};
