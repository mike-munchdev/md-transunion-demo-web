import React from 'react';
import client from './graphql/setup';

import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Home} from './pages/Home';
const App = () => {
  
  return (
    <ApolloProvider client={client}>
      <Router>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>            
          </Switch>
        </Router>
    </ApolloProvider>
   
  );
}

export default App;
