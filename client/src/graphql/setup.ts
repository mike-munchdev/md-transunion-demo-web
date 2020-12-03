import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { setContext } from 'apollo-link-context';
import { useServerInfo } from '../utils/serverInfo';
const [httpLinkUri, wsLinkUri] = useServerInfo();

// Create an http link:
const httpLink = new HttpLink({
  uri: `${httpLinkUri}/graphql`,
});

const token = localStorage.getItem('token');
const drToken = localStorage.getItem('drToken');

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `${wsLinkUri}/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      'x-auth': token,
      'x-authdr': drToken,
    },
  },
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  const drToken = localStorage.getItem('drToken');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      'x-auth': token,
      'x-authdr': drToken,
    },
  };
});
// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const cache = new InMemoryCache();
cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
    token: localStorage.getItem('token'),
    customer: null,
  },
});

export default new ApolloClient({
  link: authLink.concat(link),
  cache,
});
