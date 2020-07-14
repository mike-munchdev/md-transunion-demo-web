import React, { FC } from 'react';

import { useHistory } from 'react-router-dom';
import { IQuestionnaireStepsProps } from '.';

import Content from './Content';

const AccountCreation: FC<IQuestionnaireStepsProps> = ({
  currentStepIndex,
  steps,
  setCurrentStepIndex,
}) => {
  const history = useHistory();
  return (
    <Content
      title={
        currentStepIndex >= 0 ? steps[currentStepIndex].title.toUpperCase() : ''
      }
      handleNextClick={() => {
        history.push(`/questionnaire/${steps[currentStepIndex + 1].slug}`);
        setCurrentStepIndex(currentStepIndex + 1);
      }}
      isFirstStep={currentStepIndex === 0}
      submit={currentStepIndex === steps.length - 1}
      handlePreviousClick={() => {
        history.push(`/questionnaire/${steps[currentStepIndex - 1].slug}`);
        setCurrentStepIndex(currentStepIndex - 1);
      }}
    />
  );
};

export default AccountCreation;
