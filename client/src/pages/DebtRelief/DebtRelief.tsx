import React, { useState, useEffect, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';
import PrivateClientRoute from '../../layout/PrivateClientRoute';
import { Questionnaire } from '../Questionnaire';
import Login from './Login';
import DebtReliefHome from './DebtReliefHome';

const DebtRelief = (props: any) => {
  console.log('DebtRelief:props', props);
  return (
    <Fragment>
      <Container className="debt-relief-container">
        {/* <Switch>
          <Route exact path="/debtrelief" component={Questionnaire} />
          <Route exact path="/login" component={Login} />

          <PrivateClientRoute
            exact
            path="/questionnaire/:step"
            component={Questionnaire}
          />
          <PrivateClientRoute
            exact
            path="/questionnaire"
            component={Questionnaire}
          />
          <Route component={Login} />
        </Switch> */}
      </Container>
    </Fragment>
  );
};

export default DebtRelief;
