import React, { FC, useState, useEffect, useMemo } from 'react';
import { Switch, Redirect, useLocation, useHistory } from 'react-router-dom';
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
  IQuestionnaireStepsProps,
  Confirm,
  IQuestionnaireFormValues,
} from '../../components/Questionnaire/index';

import { useToasts } from 'react-toast-notifications';
import { debtReliefSchema } from '../../validation/debtReliefSchema';
import PrivateDebtReliefRoute from '../../layout/PrivateDebtReliefRoute';
import { DebtReliefAuthContext, DebtReliefContext } from '../../utils/context';
import { Login } from '.';
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
  const [, setApplication] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const { addToast } = useToasts();

  const authContext = useMemo(() => {
    return {
      redirect: (location: string) => {
        history.push(location);
      },
      signIn: (token: string, application: any, location?: string) => {
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
      },
      signUp: (message: string) => {
        addToast(message, { appearance: 'success' });
      },
      isLoggedIn,
    };
  }, [addToast, history, isLoggedIn]);

  useEffect(() => {
    // console.log(
    //   'localStorage.getItem(drToken) !== null',
    //   localStorage.getItem('drToken') !== null
    // );
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
    Step: FC<IQuestionnaireStepsProps>,
    stepIndex: number,
    steps: IStep[],
    formikProps: FormikProps<IQuestionnaireFormValues>
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
      <DebtReliefContext.Provider
        value={{
          currentStepIndex,
          setCurrentStepIndexContext: (index: number) => {
            setCurrentStepIndex(index);
          },
        }}
      >
        <Formik
          initialValues={{
            applicant: {
              firstName: '',
              middleName: '',
              lastName: '',
              address: '',
              address2: '',
              city: '',
              state: '',
              zip: '',
              email: '',
              primaryPhoneNumber: '',
              primaryPhoneNumberConfirm: '',
              cellPhoneNumber: '',
              faxPhoneNumber: '',
              dobMonth: 0,
              dobDay: 0,
              dobYear: 0,
              ssn: '',
              employer: '',
              occupation: '',
              workPhoneNumber: '',
              maritalStatus: '',
              hardshipReason: '',
            },
            coApplicant: {
              firstName: '',
              middleName: '',
              lastName: '',
              address: '',
              address2: '',
              city: '',
              state: '',
              zip: '',
              email: '',
              primaryPhoneNumber: '',
              primaryPhoneNumberConfirm: '',
              cellPhoneNumber: '',
              faxPhoneNumber: '',
              dobMonth: 0,
              dobDay: 0,
              dobYear: 0,
              ssn: '',
              employer: '',
              occupation: '',
              workPhoneNumber: '',
              maritalStatus: '',
              hardshipReason: '',
            },
            creditors: [],
            income: {
              monthlyNetPay: 0,
              coApplicantMonthlyNetPay: 0,
              ssnIncome: 0,
              retirementPay: 0,
              otherGovtBenefits: 0,
              childSupport: 0,
              allOtherIncome: 0,
            },
            expenses: {
              monthlyRent: 0,
              mortgage: 0,
              utilities: 0,
              groceries: 0,
              automobilePayments: 0,
              automobileExpenses: 0,
              medical: 0,
              insurance: 0,
              dayCare: 0,
              childSupport: 0,
              installmentLoans: 0,
              allOther: 0,
            },
            bankName: '',
            bankRoutingNumber: '',
            bankAccountNumber: '',
            bankAccountType: '',
            dayToMakePayment: 0,
            secondDayToMakePayment: 0,
            monthToStart: 0,
            contract: '',
            supportingDocuments: [],
          }}
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
                    render={() => <Welcome formikProps={formikProps} />}
                  />
                  <IfAuthSkipRoute
                    path="/debtrelief/accountcreation"
                    render={() => <AccountCreation formikProps={formikProps} />}
                  />
                  <IfAuthSkipRoute
                    path="/debtrelief/login"
                    exact
                    component={Login}
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
