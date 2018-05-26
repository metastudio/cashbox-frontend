/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface CategoryInput {
  type?: string | null,
  name?: string | null,
};

export interface GetOrganizationCategoriesQueryVariables {
  orgId: string,
};

export interface GetOrganizationCategoriesQuery {
  // Find an Organization by ID
  organization:  {
    __typename: "Organization",
    categories:  Array< {
      __typename: "Category",
      id: string,
      organizationId: string | null,
      name: string,
      type: string,
    } | null >,
  } | null,
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
      organizationId: string | null,
      name: string,
      type: string,
    } | null,
  } | null,
};

export interface CreateCategoryMutationVariables {
  orgId: string,
  category: CategoryInput,
};

export interface CreateCategoryMutation {
  // Create category
  createCategory:  {
    __typename: "Category",
    id: string,
    organizationId: string | null,
    name: string,
    type: string,
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
    organizationId: string | null,
    name: string,
    type: string,
  } | null,
};

export interface DeleteCategoryMutationVariables {
  categoryId: string,
};

export interface DeleteCategoryMutation {
  // Delete category
  deleteCategory:  {
    __typename: "Category",
    id: string,
    organizationId: string | null,
    name: string,
    type: string,
  } | null,
};

export interface CategoryFragment {
  __typename: "Category",
  id: string,
  organizationId: string | null,
  name: string,
  type: string,
};
