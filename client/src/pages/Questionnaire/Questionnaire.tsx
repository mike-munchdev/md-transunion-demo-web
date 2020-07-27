import React, { FC, useState, useEffect } from 'react';
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory,
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
  IQuestionnaireStepsProps,
  Confirm,
  IQuestionnaireFormValues,
} from '../../components/Questionnaire/index';

import { Step } from 'semantic-ui-react';
import { useToasts } from 'react-toast-notifications';
import { questionnaireSchema } from '../../validation/questionnaireSchema';

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
    steps: IStep[],
    formikProps: FormikProps<IQuestionnaireFormValues>
  ) => {
    return (
      <Step
        currentStepIndex={currentStepIndex}
        steps={steps}
        setCurrentStepIndex={setCurrentStepIndex}
        formikProps={formikProps}
      ></Step>
    );
  };

  return (
    <>
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
        validationSchema={questionnaireSchema}
      >
        {(formikProps) => {
          return (
            <>
              <Step.Group ordered attached="top" size="tiny" widths={8}>
                {steps.map((s) => renderStep(s))}
              </Step.Group>
              <Switch>
                <Redirect
                  from="/questionnaire"
                  exact
                  to="/questionnaire/welcome"
                />
                {steps.map((s, index) => (
                  <Route
                    key={s.slug}
                    path={`/questionnaire/${s.slug}`}
                    component={() =>
                      componentDecorator(s.component, index, steps, formikProps)
                    }
                  />
                ))}
              </Switch>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default Questionnaire;
