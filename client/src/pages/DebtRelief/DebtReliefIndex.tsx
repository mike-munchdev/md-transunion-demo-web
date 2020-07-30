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
import PrivateClientRoute from '../../layout/PrivateClientRoute';

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
  console.log('DebtReliefIndex hit');
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
              <Switch>
                <Redirect from="/debtrelief" exact to="/debtrelief/welcome" />
                <Route
                  path="/debtrelief/welcome"
                  component={() => <Welcome formikProps={formikProps} />}
                />
                <Route
                  path="/debtrelief/accountcreation"
                  component={() => (
                    <AccountCreation formikProps={formikProps} />
                  )}
                />
                {steps.map((s, index) => (
                  <PrivateClientRoute
                    key={s.slug}
                    path={`/debtrelief/${s.slug}`}
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

export default DebtReliefIndex;
