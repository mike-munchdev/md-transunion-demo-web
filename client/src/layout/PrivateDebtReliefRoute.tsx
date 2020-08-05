import React, { useContext } from 'react';
import {
  RouteProps,
  RouteComponentProps,
  Route,
  Redirect,
  useHistory,
} from 'react-router-dom';

import {
  Step,
  Container,
  Grid,
  Image,
  Button,
  Label,
  Icon,
} from 'semantic-ui-react';
import { steps } from '../pages/DebtRelief/DebtReliefIndex';
import { IStep } from '../components/Questionnaire';
import { DebtReliefAuthContext, DebtReliefContext } from '../utils/context';

interface IProps extends RouteProps {
  component?: React.ComponentType<RouteComponentProps<any>>;
  render?: () => JSX.Element;
}

const PrivateDebtReliefRoute: React.FC<IProps> = ({
  render,
  component: Component,
  ...rest
}) => {
  const { isLoggedIn, signOut } = useContext(DebtReliefAuthContext);
  const { currentStepIndex } = useContext(DebtReliefContext);
  const history = useHistory();

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

  return (
    <Container>
      <Grid
        textAlign="center"
        style={{ marginBottom: '10px' }}
        verticalAlign="middle"
      >
        <Grid.Row columns={3}>
          <Grid.Column textAlign="left" verticalAlign="bottom">
            <Button as="div" labelPosition="right">
              <Button icon color="blue">
                <Icon name="help" />
              </Button>
              <Label as="a" basic color="blue">
                Get Help
              </Label>
            </Button>
          </Grid.Column>
          <Grid.Column>
            <Image src="/logo.png" size="large" />
          </Grid.Column>
          <Grid.Column textAlign="right" verticalAlign="bottom">
            <Button as="div" labelPosition="left" onClick={() => signOut()}>
              <Label as="a" basic color="blue">
                Logout
              </Label>
              <Button icon color="blue">
                <Icon name="log out" />
              </Button>
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Step.Group ordered attached="top" size="tiny" widths={8}>
        {steps.map((s) => renderStep(s))}
      </Step.Group>
      <Route
        {...rest}
        render={(props) =>
          isLoggedIn ? (
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

export default PrivateDebtReliefRoute;
