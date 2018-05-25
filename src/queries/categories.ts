import gql from 'graphql-tag';

const GetCategory = gql`
  query GetCategory($orgId: ID!, $categoryId: ID!) {
    organization(id: $orgId) {
      category(id:$categoryId) {
        id
        name
        type
      }
    }
  }
`;

const UpdateCategory = gql`
  mutation UpdateCategory($categoryId: ID!, $category: CategoryInput!) {
    updateCategory(id: $categoryId, category: $category) {
      id
      type
      name
    }
  }
`;

export { GetCategory, UpdateCategory };
