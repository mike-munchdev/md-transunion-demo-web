import React, { useContext, useState } from 'react';
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
import { IStep, HelpModal } from '../components/DebtRelief';
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
  const [modalOpen, setModalOpen] = useState(false);
  const { isLoggedIn } = useContext(DebtReliefAuthContext);
  const { currentStepIndex, application } = useContext(DebtReliefContext);

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

  if (!application) {
    return (
      <Redirect
        to={{
          pathname: '/debtrelief/logout',
        }}
      />
    );
  }

  return (
    <Container>
      <Grid
        textAlign="center"
        style={{ marginBottom: '10px' }}
        verticalAlign="middle"
      >
        <Grid.Row columns={3}>
          <Grid.Column textAlign="left" verticalAlign="bottom">
            <HelpModal
              applicant={application.applicant}
              handleSave={() => {
                setModalOpen(false);
              }}
              handleCancel={() => {
                setModalOpen(false);
              }}
              handleOpen={() => {
                setModalOpen(true);
              }}
              isOpen={modalOpen}
            />
          </Grid.Column>
          <Grid.Column>
            <Image
              src="/meredian-logo-trans.png"
              size="large"
              style={{ marginTop: '20px' }}
            />
          </Grid.Column>
          <Grid.Column textAlign="right" verticalAlign="bottom">
            <Button
              as="div"
              labelPosition="left"
              onClick={() => history.push('/debtrelief/logout')}
            >
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
