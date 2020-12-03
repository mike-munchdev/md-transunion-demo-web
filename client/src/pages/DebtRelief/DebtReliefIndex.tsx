import React, { FC, useState, useEffect, useMemo } from 'react';
import {
  Switch,
  Redirect,
  useLocation,
  useHistory,
  Route,
} from 'react-router-dom';
import { Formik, FormikProps } from 'formik';

import {
  AccountCreation,
  Budget,
  Creditors,
  Documents,
  PaymentSetup,
  PersonalInformation,
  Welcome,
  IStep,
  IDebtReliefStepsProps,
  Confirm,
  IApplication,
} from '../../components/DebtRelief/index';

import { useToasts } from 'react-toast-notifications';
import { debtReliefSchema } from '../../validation/debtReliefSchema';
import PrivateDebtReliefRoute from '../../layout/PrivateDebtReliefRoute';
import {
  DebtReliefAuthContext,
  DebtReliefContext,
  initialApplicationValues,
} from '../../utils/context';
import { Login, Logout } from '.';
import IfAuthSkipRoute from '../../layout/IfAuthSkipRoute';

export const steps: IStep[] = [
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

const DebtReliefIndex: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [, setIsLoading] = useState(true);
  const [, setUserToken] = useState(null);
  const [application, setApplication] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('drToken') !== null
  );
  const location = useLocation();
  const history = useHistory();
  const { addToast } = useToasts();

  const authContext = useMemo(() => {
    return {
      redirect: (location: string) => {
        history.push(location);
      },
      signIn: (token: string, application: IApplication, location?: string) => {
        setIsLoading(false);
        setUserToken(token);
        setApplication(application);
        setIsLoggedIn(true);
        localStorage.setItem('drToken', token);
        localStorage.setItem('drApplication', JSON.stringify(application));

        history.push(location ? location : '/debtrelief/creditors');
      },
      signOut: () => {
        localStorage.removeItem('drToken');
        localStorage.removeItem('drApplication');
        setIsLoading(false);
        setUserToken(null);
        setApplication(null);
        setIsLoggedIn(false);
        history.push('/debtrelief');
      },
      signUp: (message: string) => {
        addToast(message, { appearance: 'success' });
      },
      isLoggedIn,
    };
  }, [addToast, history, isLoggedIn]);

  const debtReliefContext = useMemo(() => {
    return {
      currentStepIndex,
      setCurrentStepIndexContext: (index: number) => {
        setCurrentStepIndex(index);
      },
      setApplicationContext: (application: IApplication) => {
        setApplication(application);
      },
      getApplicationContext: () => {
        const applicationFromLocalStorage = localStorage.getItem(
          'drApplication'
        );

        return application
          ? application
          : applicationFromLocalStorage
          ? JSON.parse(applicationFromLocalStorage)
          : null;
      },
      application,
    };
  }, [currentStepIndex, application]);

  useEffect(() => {
    const applicationStorage = localStorage.getItem('drApplication');

    if (applicationStorage) {
      setApplication(JSON.parse(applicationStorage));
    }
    setIsLoggedIn(localStorage.getItem('drToken') !== null);
  }, []);

  useEffect(() => {
    const stepIndex = steps.findIndex(
      (s) => location.pathname.replace('/debtrelief/', '') === s.slug
    );

    if (stepIndex >= 0) {
      setCurrentStepIndex(stepIndex);
    }
  }, [location.pathname]);

  const componentDecorator = (
    Step: FC<IDebtReliefStepsProps>,
    stepIndex: number,
    steps: IStep[],
    formikProps: FormikProps<IApplication>
  ) => {
    return (
      <Step
        stepIndex={stepIndex}
        steps={steps}
        formikProps={formikProps}
      ></Step>
    );
  };

  return (
    <DebtReliefAuthContext.Provider value={authContext}>
      <DebtReliefContext.Provider value={debtReliefContext}>
        <Formik
          initialValues={initialApplicationValues}
          onSubmit={() => {
            addToast('Form submitted', { appearance: 'success' });
          }}
          validationSchema={debtReliefSchema}
        >
          {(formikProps) => {
            return (
              <>
                <Switch>
                  <Redirect from="/debtrelief" exact to="/debtrelief/welcome" />
                  <IfAuthSkipRoute
                    path="/debtrelief/welcome"
                    render={() => <AccountCreation formikProps={formikProps} />}
                  />
                  <IfAuthSkipRoute
                    path="/debtrelief/login"
                    exact
                    component={Login}
                  />
                  <Route
                    path="/debtrelief/logout"
                    exact
                    render={() => <Logout formikProps={formikProps} />}
                  />
                  {steps.map((s, index) => (
                    <PrivateDebtReliefRoute
                      key={s.slug}
                      path={`/debtrelief/${s.slug}`}
                      render={() =>
                        componentDecorator(
                          s.component,
                          index,
                          steps,
                          formikProps
                        )
                      }
                    />
                  ))}
                </Switch>
              </>
            );
          }}
        </Formik>
      </DebtReliefContext.Provider>
    </DebtReliefAuthContext.Provider>
  );
};

export default DebtReliefIndex;
