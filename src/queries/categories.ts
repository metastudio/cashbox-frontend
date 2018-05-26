import gql from 'graphql-tag';

const fragments = {
  category: gql`
    fragment Category on Category {
      id
      name
      type
    }
  `
};

const GetOrganizationCategories = gql`
  query GetOrganizationCategories($orgId: ID!) {
    organization(id: $orgId) {
      categories {
        ...Category
      }
    }
  }
  ${fragments.category}
`;

const GetCategory = gql`
  query GetCategory($orgId: ID!, $categoryId: ID!) {
    organization(id: $orgId) {
      category(id:$categoryId) {
        ...Category
      }
    }
  }
  ${fragments.category}
`;

const CreateCategory = gql`
  mutation CreateCategory($orgId: ID!, $category: CategoryInput!) {
    createCategory(orgId: $orgId, category: $category) {
      ...Category
    }
  }
  ${fragments.category}
`;

const UpdateCategory = gql`
  mutation UpdateCategory($categoryId: ID!, $category: CategoryInput!) {
    updateCategory(id: $categoryId, category: $category) {
      ...Category
    }
  }
  ${fragments.category}
`;

const DeleteCategory = gql`
  mutation DeleteCategory($categoryId: ID!) {
    deleteCategory(id: $categoryId) {
      ...Category
    }
  }
  ${fragments.category}
`;

export {
  GetOrganizationCategories,
  GetCategory,
  CreateCategory,
  UpdateCategory,
  DeleteCategory,
};
