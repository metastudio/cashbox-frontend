import gql from 'graphql-tag';

const fragments = {
  category: gql`
    fragment Category on Category {
      id
      organizationId
      name
      type
    }
  `
};

const GetOrganizationCategories = gql`
  query GetOrganizationCategories($orgId: ID!) {
    categories(orgId: $orgId) {
      ...Category
    }
  }
  ${fragments.category}
`;

const GetOrganizationTypedCategories = gql`
  query GetOrganizationTypedCategories($orgId: ID!, $type: CategoryType!) {
    categories(orgId: $orgId, type: $type) {
      ...Category
    }
  }
  ${fragments.category}
`;

const GetCategory = gql`
  query GetCategory($categoryId: ID!) {
    category(id:$categoryId) {
      ...Category
    }
  }
  ${fragments.category}
`;

const CreateCategory = gql`
  mutation CreateCategory($orgId: ID!, $category: CategoryInput!) {
    createCategory(orgId: $orgId, category: $category) {
      category {
        ...Category
      }
    }
  }
  ${fragments.category}
`;

const UpdateCategory = gql`
  mutation UpdateCategory($categoryId: ID!, $category: CategoryInput!) {
    updateCategory(id: $categoryId, category: $category) {
      category {
        ...Category
      }
    }
  }
  ${fragments.category}
`;

const DeleteCategory = gql`
  mutation DeleteCategory($categoryId: ID!) {
    deleteCategory(id: $categoryId) {
      category {
        ...Category
      }
    }
  }
  ${fragments.category}
`;

export {
  GetOrganizationCategories,
  GetOrganizationTypedCategories,

  GetCategory,
  CreateCategory,
  UpdateCategory,
  DeleteCategory,
};
