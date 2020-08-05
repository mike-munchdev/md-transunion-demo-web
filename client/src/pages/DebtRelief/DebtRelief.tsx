import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';

const DebtRelief = () => {
  return (
    <Fragment>
      <Container className="debt-relief-container">
        {/* <Switch>
          <Route exact path="/debtrelief" component={Questionnaire} />
          <Route exact path="/login" component={Login} />

          <PrivateClientRoute
            exact
            path="/debtrelief/:step"
            component={Questionnaire}
          />
          <PrivateClientRoute
            exact
            path="/debtrelief"
            component={Questionnaire}
          />
          <Route component={Login} />
        </Switch> */}
      </Container>
    </Fragment>
  );
};

export default DebtRelief;
