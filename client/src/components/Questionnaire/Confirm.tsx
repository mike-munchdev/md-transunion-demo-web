import React, { FC, useContext } from 'react';

import { useHistory } from 'react-router-dom';
import { IQuestionnaireStepsProps } from '.';

import QuestionnaireNavigationControl from './QuestionnaireNavigationControl';
import { Segment, Header } from 'semantic-ui-react';
import CalculationsTable from './CalculationsTable';
import { DebtReliefContext } from '../../utils/context';

const PersonalInformation: FC<IQuestionnaireStepsProps> = ({
  stepIndex,
  steps,

  formikProps,
}) => {
  const history = useHistory();
  const { currentStepIndex, setCurrentStepIndexContext } = useContext(
    DebtReliefContext
  );
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
          history.push(`/debtrelief/${steps[currentStepIndex + 1].slug}`);
          setCurrentStepIndexContext(currentStepIndex + 1);
        }}
        handlePreviousClick={() => {
          history.push(`/debtrelief/${steps[currentStepIndex - 1].slug}`);
          setCurrentStepIndexContext(currentStepIndex - 1);
        }}
        nextStepButtonText="Save &amp; Continue"
        nextStepDisabled={isStepInvalid()}
      />
      <CalculationsTable creditors={creditors} />
    </Segment>
  );
};

export default PersonalInformation;
