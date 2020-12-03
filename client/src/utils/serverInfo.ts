const NODE_ENV =
  typeof process !== 'undefined' && process.env && process.env.NODE_ENV;

export const useServerInfo = () => {
  const httpProtocol =
    NODE_ENV === 'development' ? 'http' : process.env.REACT_APP_HTTP_PROTOCOL;
  const wsProtocol =
    NODE_ENV === 'development' ? 'ws' : process.env.REACT_APP_WS_PROTOCOL;
  const serverUrl =
    NODE_ENV === 'development'
      ? 'localhost:4005'
      : process.env.REACT_APP_GRAPHQL_URL;

  return [`${httpProtocol}://${serverUrl}`, `${wsProtocol}://${serverUrl}`];
};
