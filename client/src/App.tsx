import React, { Fragment } from 'react';
import client from './graphql/setup';

import { ApolloProvider } from '@apollo/react-hooks';
import {
  Switch,
  Route,
  RouteComponentProps,
  withRouter,
} from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';

import { Home } from './pages/Home';
import { Accounts } from './pages/Accounts';
import PrivateRoute from './layout/PrivateRoute';
import { NavBar } from './components/NavBar';
import { Container } from 'semantic-ui-react';
import NotFound from './layout/NotFound';
import { CustomerInformation } from './pages/CustomerInformation';
import { Questionnaire } from './pages/Questionnaire';
import PrivateClientRoute from './layout/PrivateClientRoute';
import { DebtReliefIndex } from './pages/DebtRelief';
const notDebtRelief = /^(?!.*(\/debtrelief)).*$/;

const App: React.FC<RouteComponentProps> = () => {
  return (
    <ApolloProvider client={client}>
      <ToastProvider placement="top-right" autoDismiss={true}>
        <Route path="/debtrelief" component={DebtReliefIndex} />
        <Route path="/" exact>
          <Home />
        </Route>
        <Route
          path={'/^(?!.*(/debtrelief)).*$/'}
          render={() => (
            <Fragment>
              <NavBar />
              <Container className="main-container">
                <Switch>
                  <PrivateClientRoute
                    exact
                    path="/customer"
                    component={CustomerInformation}
                  />
                  <PrivateClientRoute
                    exact
                    path="/accounts"
                    component={Accounts}
                  />
                  <Route component={NotFound} />
                </Switch>
              </Container>
            </Fragment>
          )}
        />
      </ToastProvider>
    </ApolloProvider>
  );
};

export default withRouter(App);
