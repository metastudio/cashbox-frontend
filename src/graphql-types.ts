/* tslint:disable */
//  This file was automatically generated and should not be edited.

export enum CategoryType {
  Expense = "Expense", // Expense category
  Income = "Income", // Income category
}


export interface CategoryInput {
  type?: CategoryType | null,
  name?: string | null,
};

export interface GetOrganizationCategoriesQueryVariables {
  orgId: string,
};

export interface GetOrganizationCategoriesQuery {
  // Categories for given organization
  categories:  Array< {
    __typename: "Category",
    id: string,
    organizationId: string,
    name: string,
    type: CategoryType,
  } >,
};

export interface GetOrganizationTypedCategoriesQueryVariables {
  orgId: string,
  type: CategoryType,
};

export interface GetOrganizationTypedCategoriesQuery {
  // Categories for given organization
  categories:  Array< {
    __typename: "Category",
    id: string,
    organizationId: string,
    name: string,
    type: CategoryType,
  } >,
};

export interface GetCategoryQueryVariables {
  categoryId: string,
};

export interface GetCategoryQuery {
  // Find a Category by ID
  category:  {
    __typename: "Category",
    id: string,
    organizationId: string,
    name: string,
    type: CategoryType,
  },
};

export interface CreateCategoryMutationVariables {
  orgId: string,
  category: CategoryInput,
};

export interface CreateCategoryMutation {
  // Create a category
  createCategory:  {
    __typename: "CreateCategoryPayload",
    // Created category
    category:  {
      __typename: "Category",
      id: string,
      organizationId: string,
      name: string,
      type: CategoryType,
    },
  } | null,
};

export interface UpdateCategoryMutationVariables {
  categoryId: string,
  category: CategoryInput,
};

export interface UpdateCategoryMutation {
  // Update a category
  updateCategory:  {
    __typename: "UpdateCategoryPayload",
    // Updated category
    category:  {
      __typename: "Category",
      id: string,
      organizationId: string,
      name: string,
      type: CategoryType,
    },
  } | null,
};

export interface DeleteCategoryMutationVariables {
  categoryId: string,
};

export interface DeleteCategoryMutation {
  // Delete a category
  deleteCategory:  {
    __typename: "DeleteCategoryPayload",
    // Deleted category
    category:  {
      __typename: "Category",
      id: string,
      organizationId: string,
      name: string,
      type: CategoryType,
    },
  } | null,
};

export interface CategoryFragment {
  __typename: "Category",
  id: string,
  organizationId: string,
  name: string,
  type: CategoryType,
};
