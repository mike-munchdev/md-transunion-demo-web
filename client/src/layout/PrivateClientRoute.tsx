import React from 'react';
import {
  RouteProps,
  RouteComponentProps,
  Route,
  Redirect,
  useHistory,
} from 'react-router-dom';

import { Step, Container, Grid, Image } from 'semantic-ui-react';
import { steps } from '../pages/DebtRelief/DebtReliefIndex';
import { IStep } from '../components/Questionnaire';

interface IProps extends RouteProps {
  component?: React.ComponentType<RouteComponentProps<any>>;
  render?: () => JSX.Element;
}

const PrivateClientRoute: React.FC<IProps> = ({
  render,
  component: Component,
  ...rest
}) => {
  const history = useHistory();

  const currentStepIndex = 0;
  const renderStep = (s: IStep) => {
    return (
      <Step
        link
        onClick={() => {
          history.push(`/debtrelief/${s.slug}`);
        }}
        key={s.slug}
        active={steps[currentStepIndex].slug === s.slug}
      >
        <Step.Content>
          <Step.Title>{s.title}</Step.Title>
        </Step.Content>
      </Step>
    );
  };

  const isDebtReliefLoggedIn = true;

  return (
    <Container>
      <Grid
        textAlign="center"
        style={{ marginBottom: '10px' }}
        verticalAlign="middle"
      >
        <Image src="/logo.png" size="large" />
      </Grid>
      <Step.Group ordered attached="top" size="tiny" widths={8}>
        {steps.map((s) => renderStep(s))}
      </Step.Group>
      <Route
        {...rest}
        render={(props) =>
          isDebtReliefLoggedIn ? (
            render !== undefined ? (
              render()
            ) : (
              <Component {...props} />
            )
          ) : (
            <Redirect
              to={{
                pathname: '/debtrelief/login',
                state: { from: props.location },
              }}
            />
          )
        }
      />
    </Container>
  );
};

export default PrivateClientRoute;
