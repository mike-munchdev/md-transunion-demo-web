import React, { useContext } from 'react';
import {
  RouteProps,
  RouteComponentProps,
  Route,
  Redirect,
} from 'react-router-dom';

import { DebtReliefAuthContext } from '../utils/context';

interface IProps extends RouteProps {
  component?: React.ComponentType<RouteComponentProps<any>>;
  render?: () => JSX.Element;
}

const IfAuthSkipRoute: React.FC<IProps> = ({
  render,
  component: Component,
  ...rest
}) => {
  const { isLoggedIn } = useContext(DebtReliefAuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        !isLoggedIn ? (
          render !== undefined ? (
            render()
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect
            to={{
              pathname: '/debtrelief/creditors',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default IfAuthSkipRoute;
