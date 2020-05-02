import { useQuery, useApolloClient } from '@apollo/react-hooks';
import jwt from 'jsonwebtoken';
import {
  GET_TOKEN_CLIENT,
  IS_LOGGED_IN_CLIENT,
} from '../graphql/queries/localState';
import { useHistory } from 'react-router-dom';

export const useLoggedIn = () => {
  const {
    data: { isLoggedIn },
  } = useQuery(IS_LOGGED_IN_CLIENT);

  return isLoggedIn;
};

export const useCustomerInfo = () => {
  const isLoggedIn = useLoggedIn();

  const {
    data: { token },
  } = useQuery(GET_TOKEN_CLIENT);
  if (!isLoggedIn) return null;
  const decoded = jwt.decode(token);
  const decodedCustomer = (decoded as any).info;
  return decodedCustomer;
};

export const useLogout = () => {
  const client = useApolloClient();
  let history = useHistory();
  return () => {
    localStorage.removeItem('token');
    client.writeData({
      data: {
        isLoggedIn: false,
        token: null,
        customer: null,
      },
    });
    history.push('/');
  };
};
