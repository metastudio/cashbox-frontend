import ApolloClient, { Operation } from 'apollo-boost';

import { getCookies } from 'utils/cookies';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  request: async (operation: Operation) => {
    const token = getCookies().token;
    const basicAuth = token ? { 'Authorization': token } : null;
    operation.setContext({
      headers: {
        ...basicAuth
      }
    });
  },
});

export default client;
