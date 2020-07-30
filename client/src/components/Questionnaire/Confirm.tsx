import React, { FC } from 'react';

import { useHistory } from 'react-router-dom';
import { IQuestionnaireStepsProps } from '.';

import QuestionnaireNavigationControl from './QuestionnaireNavigationControl';
import { Segment, Header } from 'semantic-ui-react';
import CalculationsTable from './CalculationsTable';

const PersonalInformation: FC<IQuestionnaireStepsProps> = ({
  currentStepIndex,
  steps,
  setCurrentStepIndex,
  formikProps,
}) => {
  const history = useHistory();

  const { values } = formikProps;
  const { creditors } = values;
  const isStepInvalid = () => {
    return false;
  };

  return (
    <Segment attached>
      <Header size="medium">
        {currentStepIndex >= 0
          ? steps[currentStepIndex].title.toUpperCase()
          : ''}
      </Header>
      <p>
        <strong>View All Information and Submit</strong>
      </p>

      <QuestionnaireNavigationControl
        submit={currentStepIndex === steps.length - 1}
        isFirstStep={currentStepIndex === 0}
        handleNextClick={() => {
          history.push(`/questionnaire/${steps[currentStepIndex + 1].slug}`);
          setCurrentStepIndex(currentStepIndex + 1);
        }}
        handlePreviousClick={() => {
          history.push(`/questionnaire/${steps[currentStepIndex - 1].slug}`);
          setCurrentStepIndex(currentStepIndex - 1);
        }}
        nextStepButtonText="Save &amp; Continue"
        nextStepDisabled={isStepInvalid()}
      />
      <CalculationsTable creditors={creditors} />
    </Segment>
  );
};

export default PersonalInformation;
