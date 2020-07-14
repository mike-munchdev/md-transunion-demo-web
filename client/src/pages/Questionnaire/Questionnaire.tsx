import React, { FC, useState, useEffect } from 'react';
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { Formik, Form } from 'formik';

import {
  AccountCreation,
  Budget,
  Creditors,
  Documents,
  PaymentSetup,
  PersonalInformation,
  Welcome,
  IStep,
  IQuestionnaireStepsProps,
  Confirm,
} from '../../components/Questionnaire/index';

import { Step } from 'semantic-ui-react';
import { useToasts } from 'react-toast-notifications';

const steps: IStep[] = [
  {
    title: 'Welcome',
    description: 'Start New Debt Comparison',
    slug: 'welcome',
    component: Welcome,
  },
  {
    title: 'Account Creation',
    description: 'Enter Account information',
    slug: 'account',
    component: AccountCreation,
  },
  {
    title: 'Creditors',
    description: 'Start New Debt Comparison',
    slug: 'creditors',
    component: Creditors,
  },
  {
    title: 'Budget',
    description: 'Start New Debt Comparison',
    slug: 'budget',
    component: Budget,
  },
  {
    title: 'Personal Information',
    description: 'Start New Debt Comparison',
    slug: 'personal-info',
    component: PersonalInformation,
  },
  {
    title: 'Payment Setup',
    description: 'Start New Debt Comparison',
    slug: 'payment-setup',
    component: PaymentSetup,
  },
  {
    title: 'Documents',
    description: 'Start New Debt Comparison',
    slug: 'documents',
    component: Documents,
  },
  {
    title: 'Confirm',
    description: 'Confirm',
    slug: 'confirm',
    component: Confirm,
  },
];

const Questionnaire = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const location = useLocation();
  const history = useHistory();
  const { addToast } = useToasts();

  useEffect(() => {
    const stepIndex = steps.findIndex(
      (s) => location.pathname.replace('/questionnaire/', '') === s.slug
    );

    if (stepIndex >= 0) {
      setCurrentStepIndex(stepIndex);
    }
  }, [location.pathname]);

  const renderStep = (s: IStep) => {
    return (
      <Step
        link
        onClick={() => {
          history.push(`/questionnaire/${s.slug}`);
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

  const componentDecorator = (
    Step: FC<IQuestionnaireStepsProps>,
    currentStepIndex: number,
    steps: IStep[]
  ) => {
    return (
      <Step
        currentStepIndex={currentStepIndex}
        steps={steps}
        setCurrentStepIndex={setCurrentStepIndex}
      ></Step>
    );
  };

  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          state: '',
          zipCode: '',
          tos: false,
        }}
        onSubmit={() => {
          addToast('Form submitted', { appearance: 'success' });
        }}
      >
        <Form>
          <Step.Group lin ordered attached="top" size="tiny" widths={8}>
            {steps.map((s) => renderStep(s))}
          </Step.Group>
          <Switch>
            <Redirect from="/questionnaire" exact to="/questionnaire/welcome" />
            {steps.map((s, index) => (
              <Route
                key={s.slug}
                path={`/questionnaire/${s.slug}`}
                component={() => componentDecorator(s.component, index, steps)}
              />
            ))}
          </Switch>
        </Form>
      </Formik>
    </div>
  );
};

export default Questionnaire;
