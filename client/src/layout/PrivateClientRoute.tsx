import React from 'react';
import {
  RouteProps,
  RouteComponentProps,
  Route,
  Redirect,
  useHistory,
} from 'react-router-dom';
import { useLoggedIn } from '../utils/customerInfo';
import { Step } from 'semantic-ui-react';
import { steps } from '../pages/DebtRelief/DebtReliefIndex';
import { IStep } from '../components/Questionnaire';

interface IProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>>;
}

const PrivateClientRoute: React.FC<IProps> = ({
  component: Component,
  ...rest
}) => {
  const history = useHistory();
  console.log('rest', rest);
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
    <>
      <Step.Group ordered attached="top" size="tiny" widths={8}>
        {steps.map((s) => renderStep(s))}
      </Step.Group>
      <Route
        {...rest}
        render={(props) =>
          isDebtReliefLoggedIn ? (
            <Component {...props} />
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
    </>
  );
};

export default PrivateClientRoute;
