import React, { useContext, useState } from 'react';
import {
  RouteProps,
  RouteComponentProps,
  Route,
  Redirect,
} from 'react-router-dom';
import { IS_LOGGED_IN_CLIENT } from '../graphql/queries/localState';
import { useQuery } from '@apollo/react-hooks';
import LoadingComponent from '../components/Loading/Loading';

interface IProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>>;
}

const PrivateRoute: React.FC<IProps> = ({ component: Component, ...rest }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { data } = useQuery(IS_LOGGED_IN_CLIENT, {
    onCompleted: ({ isLoggedIn }) => {
      setIsLoading(false);
      setIsLoggedIn(isLoggedIn);
    },
  });

  if (isLoading) return <LoadingComponent />;

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
