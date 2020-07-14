import React, { FC } from 'react';

import { IQuestionnaireStepsProps } from '.';

import Content from './Content';
import { useHistory } from 'react-router-dom';

const Confirm: FC<IQuestionnaireStepsProps> = ({
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
      isFirstStep={currentStepIndex === 0}
      submit
      handlePreviousClick={() => {
        history.push(`/questionnaire/${steps[currentStepIndex - 1].slug}`);
        setCurrentStepIndex(currentStepIndex - 1);
      }}
    />
  );
};

export default Confirm;
